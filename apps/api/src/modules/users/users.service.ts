import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { UpdateProfileDto, CreateAddressDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    await this.userRepo.update(userId, dto);
    return this.getProfile(userId);
  }

  async getAddresses(userId: string) {
    return this.addressRepo.find({
      where: { userId },
      order: { isDefault: 'DESC', createdAt: 'DESC' },
    });
  }

  async createAddress(userId: string, dto: CreateAddressDto) {
    if (dto.isDefault) {
      await this.addressRepo.update({ userId }, { isDefault: false });
    }
    const address = this.addressRepo.create({ ...dto, userId });
    return this.addressRepo.save(address);
  }

  async updateAddress(userId: string, addressId: string, dto: Partial<CreateAddressDto>) {
    const address = await this.addressRepo.findOne({ where: { id: addressId, userId } });
    if (!address) throw new NotFoundException('Address not found');

    if (dto.isDefault) {
      await this.addressRepo.update({ userId }, { isDefault: false });
    }
    await this.addressRepo.update(addressId, dto);
    return this.addressRepo.findOne({ where: { id: addressId } });
  }

  async deleteAddress(userId: string, addressId: string) {
    const address = await this.addressRepo.findOne({ where: { id: addressId, userId } });
    if (!address) throw new NotFoundException('Address not found');
    await this.addressRepo.delete(addressId);
    return { message: 'Address deleted' };
  }

  // Admin: list all users
  async findAll(page = 1, limit = 20) {
    const [users, total] = await this.userRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { users, total, page, limit };
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateStatus(id: string, status: string) {
    await this.userRepo.update(id, { status: status as any });
    return this.findOne(id);
  }
}
