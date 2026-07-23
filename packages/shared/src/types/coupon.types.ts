import { DiscountType } from '../constants/payment-status';

export interface ICoupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}
