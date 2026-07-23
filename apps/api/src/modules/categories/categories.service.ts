import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async findAll() {
    return this.categoryRepo.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC', name: 'ASC' },
    });
  }

  async findAllAdmin() {
    return this.categoryRepo.find({ order: { sortOrder: 'ASC', createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async findBySlug(slug: string) {
    const category = await this.categoryRepo.findOne({ where: { slug, isActive: true } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(dto: CreateCategoryDto) {
    const slug = dto.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    const existing = await this.categoryRepo.findOne({ where: { slug } });
    if (existing) throw new ConflictException('Category with this name already exists');

    const category = this.categoryRepo.create({ ...dto, slug });
    return this.categoryRepo.save(category);
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id);
    await this.categoryRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.categoryRepo.delete(id);
    return { message: 'Category deleted' };
  }
}
