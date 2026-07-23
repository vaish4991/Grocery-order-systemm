import { z } from 'zod';
import { DiscountType } from '../constants/payment-status';

export const ApplyCouponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required').toUpperCase(),
  orderAmount: z.number().positive('Order amount is required'),
});

export const CreateCouponSchema = z.object({
  code: z
    .string()
    .min(3, 'Code must be at least 3 characters')
    .max(20)
    .toUpperCase()
    .regex(/^[A-Z0-9]+$/, 'Only uppercase letters and numbers allowed'),
  discountType: z.nativeEnum(DiscountType),
  discountValue: z.number().positive('Discount value must be positive'),
  minOrderAmount: z.number().positive().optional(),
  maxDiscountAmount: z.number().positive().optional(),
  usageLimit: z.number().int().positive().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  isActive: z.boolean().default(true),
});

export const UpdateCouponSchema = CreateCouponSchema.partial();

export type ApplyCouponInput = z.infer<typeof ApplyCouponSchema>;
export type CreateCouponInput = z.infer<typeof CreateCouponSchema>;
export type UpdateCouponInput = z.infer<typeof UpdateCouponSchema>;
