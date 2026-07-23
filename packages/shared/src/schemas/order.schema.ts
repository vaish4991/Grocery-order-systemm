import { z } from 'zod';

export const CreateOrderSchema = z.object({
  addressId: z.string().uuid('Invalid address'),
  couponCode: z.string().optional(),
  notes: z.string().max(500).optional(),
  paymentMethod: z.enum(['RAZORPAY', 'COD']),
});

export const UpdateOrderStatusSchema = z.object({
  status: z.enum([
    'PENDING',
    'CONFIRMED',
    'PROCESSING',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED',
    'RETURNED',
  ]),
});

export const AddressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required').max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  addressLine1: z.string().min(5, 'Address is required').max(255),
  addressLine2: z.string().max(255).optional(),
  city: z.string().min(2, 'City is required').max(100),
  state: z.string().min(2, 'State is required').max(100),
  country: z.string().default('India'),
  postalCode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit PIN code'),
  isDefault: z.boolean().default(false),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof UpdateOrderStatusSchema>;
export type AddressInput = z.infer<typeof AddressSchema>;
