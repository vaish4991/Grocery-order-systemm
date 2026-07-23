import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon, DiscountType } from './entities/coupon.entity';
import {
  IsString, IsEnum, IsNumber, IsOptional, IsBoolean, IsDateString, IsPositive, Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCouponDto {
  @ApiProperty() @IsString() code: string;
  @ApiProperty({ enum: DiscountType }) @IsEnum(DiscountType) discountType: DiscountType;
  @ApiProperty() @IsNumber() @IsPositive() @Type(() => Number) discountValue: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @IsPositive() @Type(() => Number) minOrderAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @IsPositive() @Type(() => Number) maxDiscountAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(1) @Type(() => Number) usageLimit?: number;
  @ApiProperty() @IsDateString() startDate: string;
  @ApiProperty() @IsDateString() endDate: string;
  @ApiPropertyOptional({ default: true }) @IsOptional() @IsBoolean() isActive?: boolean;
}

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon) private couponRepo: Repository<Coupon>,
  ) {}

  async applyCoupon(code: string, orderAmount: number) {
    const coupon = await this.couponRepo.findOne({
      where: { code: code.toUpperCase(), isActive: true },
    });

    if (!coupon) throw new NotFoundException('Invalid coupon code');
    if (new Date() < coupon.startDate || new Date() > coupon.endDate) {
      throw new BadRequestException('Coupon is not valid at this time');
    }
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      throw new BadRequestException('Coupon usage limit exceeded');
    }
    if (coupon.minOrderAmount && orderAmount < Number(coupon.minOrderAmount)) {
      throw new BadRequestException(
        `Minimum order amount for this coupon is ₹${coupon.minOrderAmount}`,
      );
    }

    let discountAmount = 0;
    if (coupon.discountType === DiscountType.PERCENTAGE) {
      discountAmount = (orderAmount * Number(coupon.discountValue)) / 100;
      if (coupon.maxDiscountAmount) {
        discountAmount = Math.min(discountAmount, Number(coupon.maxDiscountAmount));
      }
    } else {
      discountAmount = Number(coupon.discountValue);
    }

    return {
      valid: true,
      couponCode: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount: Number(discountAmount.toFixed(2)),
      finalAmount: Number((orderAmount - discountAmount).toFixed(2)),
    };
  }

  async findAll() {
    return this.couponRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const coupon = await this.couponRepo.findOne({ where: { id } });
    if (!coupon) throw new NotFoundException('Coupon not found');
    return coupon;
  }

  async create(dto: CreateCouponDto) {
    const existing = await this.couponRepo.findOne({
      where: { code: dto.code.toUpperCase() },
    });
    if (existing) throw new BadRequestException('Coupon code already exists');

    return this.couponRepo.save(
      this.couponRepo.create({
        ...dto,
        code: dto.code.toUpperCase(),
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      }),
    );
  }

  async update(id: string, dto: Partial<CreateCouponDto>) {
    await this.findOne(id);
    await this.couponRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.couponRepo.delete(id);
    return { message: 'Coupon deleted' };
  }
}
