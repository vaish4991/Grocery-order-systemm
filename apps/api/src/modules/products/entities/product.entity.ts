import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { ProductImage } from './product-image.entity';

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ length: 200 })
  name: string;

  @Column({ unique: true, length: 250 })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountPrice: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ unique: true, length: 100 })
  sku: string;

  @Column({ length: 100, nullable: true })
  brand: string;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
    eager: true,
  })
  images: ProductImage[];

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ default: 0 })
  salesCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
