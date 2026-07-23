import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductStatus } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(ProductImage) private imageRepo: Repository<ProductImage>,
  ) {}

  async findAll(query: ProductQueryDto) {
    const { search, categoryId, minPrice, maxPrice, inStock, sortBy, page = 1, limit = 20 } = query;

    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.status = :status', { status: ProductStatus.ACTIVE });

    if (search) {
      qb.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search OR product.brand ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (categoryId) {
      qb.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    if (minPrice !== undefined) {
      qb.andWhere('COALESCE(product.discountPrice, product.price) >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      qb.andWhere('COALESCE(product.discountPrice, product.price) <= :maxPrice', { maxPrice });
    }

    if (inStock) {
      qb.andWhere('product.stock > 0');
    }

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        qb.orderBy('COALESCE(product.discountPrice, product.price)', 'ASC');
        break;
      case 'price_desc':
        qb.orderBy('COALESCE(product.discountPrice, product.price)', 'DESC');
        break;
      case 'popular':
        qb.orderBy('product.salesCount', 'DESC');
        break;
      case 'rating':
        qb.orderBy('product.averageRating', 'DESC');
        break;
      default:
        qb.orderBy('product.createdAt', 'DESC');
    }

    const total = await qb.getCount();
    const products = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findBySlug(slug: string) {
    const product = await this.productRepo.findOne({
      where: { slug, status: ProductStatus.ACTIVE },
      relations: ['category', 'images'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findById(id: string) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category', 'images'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getFeatured(limit = 8) {
    return this.productRepo.find({
      where: { status: ProductStatus.ACTIVE },
      order: { salesCount: 'DESC' },
      take: limit,
      relations: ['images', 'category'],
    });
  }

  async create(dto: CreateProductDto) {
    const slug = await this.generateUniqueSlug(dto.name);

    const product = this.productRepo.create({
      categoryId: dto.categoryId,
      name: dto.name,
      slug,
      description: dto.description,
      price: dto.price,
      discountPrice: dto.discountPrice,
      stock: dto.stock,
      sku: dto.sku,
      brand: dto.brand,
      status: dto.status || ProductStatus.ACTIVE,
    });

    const saved = await this.productRepo.save(product);

    // Save images
    if (dto.imageUrls && dto.imageUrls.length > 0) {
      const images = dto.imageUrls.map((url, index) =>
        this.imageRepo.create({
          productId: saved.id,
          imageUrl: url,
          isPrimary: index === 0,
          sortOrder: index,
        }),
      );
      await this.imageRepo.save(images);
    }

    return this.findById(saved.id);
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findById(id);
    await this.productRepo.update(id, dto);
    return this.findById(id);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.productRepo.delete(id);
    return { message: 'Product deleted' };
  }

  async updateStock(id: string, quantity: number) {
    await this.productRepo.decrement({ id }, 'stock', quantity);
    await this.productRepo.increment({ id }, 'salesCount', quantity);
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    const base = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    let slug = base;
    let count = 0;
    while (await this.productRepo.findOne({ where: { slug } })) {
      count++;
      slug = `${base}-${count}`;
    }
    return slug;
  }
}
