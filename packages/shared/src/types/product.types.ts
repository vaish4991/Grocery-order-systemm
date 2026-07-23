export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export interface IProduct {
  id: string;
  categoryId: string;
  category?: ICategory;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
  brand?: string;
  status: ProductStatus;
  images: IProductImage[];
  averageRating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}
