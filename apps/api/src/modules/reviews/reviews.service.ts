import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Product } from '../products/entities/product.entity';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comment?: string;
}

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async getProductReviews(productId: string, page = 1, limit = 10) {
    const [reviews, total] = await this.reviewRepo.findAndCount({
      where: { productId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user'],
    });
    return { reviews, total, page, limit };
  }

  async getUserReviews(userId: string) {
    return this.reviewRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: ['product'],
    });
  }

  async create(userId: string, productId: string, dto: CreateReviewDto) {
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    const existing = await this.reviewRepo.findOne({ where: { userId, productId } });
    if (existing) throw new BadRequestException('You have already reviewed this product');

    const review = await this.reviewRepo.save(
      this.reviewRepo.create({ userId, productId, ...dto }),
    );

    // Update product rating
    await this.updateProductRating(productId);

    return review;
  }

  async update(userId: string, reviewId: string, dto: Partial<CreateReviewDto>) {
    const review = await this.reviewRepo.findOne({ where: { id: reviewId, userId } });
    if (!review) throw new NotFoundException('Review not found');

    await this.reviewRepo.update(reviewId, dto);
    await this.updateProductRating(review.productId);

    return this.reviewRepo.findOne({ where: { id: reviewId } });
  }

  async delete(userId: string, reviewId: string) {
    const review = await this.reviewRepo.findOne({ where: { id: reviewId, userId } });
    if (!review) throw new NotFoundException('Review not found');

    const productId = review.productId;
    await this.reviewRepo.delete(reviewId);
    await this.updateProductRating(productId);

    return { message: 'Review deleted' };
  }

  private async updateProductRating(productId: string) {
    const result = await this.reviewRepo
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avgRating')
      .addSelect('COUNT(review.id)', 'count')
      .where('review.productId = :productId', { productId })
      .getRawOne();

    await this.productRepo.update(productId, {
      averageRating: Number(result?.avgRating || 0),
      reviewCount: Number(result?.count || 0),
    });
  }
}
