import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto/product.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Products')
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get('products')
  @ApiOperation({ summary: 'List products with filters, sorting, and pagination' })
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Public()
  @Get('products/featured')
  @ApiOperation({ summary: 'Get featured/best-seller products' })
  getFeatured() {
    return this.productsService.getFeatured();
  }

  @Public()
  @Get('products/:slug')
  @ApiOperation({ summary: 'Get product details by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  // Admin routes
  @Post('admin/products')
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Create product' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch('admin/products/:id')
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Update product' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete('admin/products/:id')
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Delete product' })
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
