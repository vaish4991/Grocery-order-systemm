import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReviewsService, CreateReviewDto } from './reviews.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Reviews')
@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Public()
  @Get('products/:productId/reviews')
  @ApiOperation({ summary: 'Get reviews for a product' })
  getProductReviews(
    @Param('productId') productId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.reviewsService.getProductReviews(productId, page, limit);
  }

  @ApiBearerAuth()
  @Get('users/me/reviews')
  @ApiOperation({ summary: 'Get my reviews' })
  getUserReviews(@CurrentUser('id') userId: string) {
    return this.reviewsService.getUserReviews(userId);
  }

  @ApiBearerAuth()
  @Post('products/:productId/reviews')
  @ApiOperation({ summary: 'Add a product review' })
  create(
    @CurrentUser('id') userId: string,
    @Param('productId') productId: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.create(userId, productId, dto);
  }

  @ApiBearerAuth()
  @Patch('reviews/:id')
  @ApiOperation({ summary: 'Edit my review' })
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: Partial<CreateReviewDto>,
  ) {
    return this.reviewsService.update(userId, id, dto);
  }

  @ApiBearerAuth()
  @Delete('reviews/:id')
  @ApiOperation({ summary: 'Delete my review' })
  delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.reviewsService.delete(userId, id);
  }
}
