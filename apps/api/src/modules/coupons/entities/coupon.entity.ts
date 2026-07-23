import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 30 })
  code: string;

  @Column({ type: 'enum', enum: DiscountType })
  discountType: DiscountType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discountValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  minOrderAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  maxDiscountAmount: number;

  @Column({ nullable: true })
  usageLimit: number;

  @Column({ default: 0 })
  usageCount: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
