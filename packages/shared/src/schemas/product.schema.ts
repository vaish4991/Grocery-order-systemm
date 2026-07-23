import { z } from 'zod';
import { ProductStatus } from '../types/product.types';

export const CreateProductSchema = z.object({
  name: z.string().min(2, 'Product name is required').max(200),
  categoryId: z.string().uuid('Invalid category'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  discountPrice: z.number().positive().optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  sku: z.string().min(1, 'SKU is required').max(100),
  brand: z.string().max(100).optional(),
  status: z.nativeEnum(ProductStatus).default(ProductStatus.ACTIVE),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const CreateCategorySchema = z.object({
  name: z.string().min(2, 'Category name is required').max(100),
  description: z.string().max(500).optional(),
  image: z.string().url().optional(),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

export const ProductFilterSchema = z.object({
  categoryId: z.string().uuid().optional(),
  search: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  inStock: z.boolean().optional(),
  sortBy: z.enum(['price_asc', 'price_desc', 'newest', 'popular', 'rating']).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(20),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
export type ProductFilterInput = z.infer<typeof ProductFilterSchema>;
