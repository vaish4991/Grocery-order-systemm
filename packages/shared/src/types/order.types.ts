import { OrderStatus } from '../constants/order-status';
import { PaymentMethod, PaymentStatus } from '../constants/payment-status';
import { IAddress } from './user.types';

export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage?: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface IPayment {
  id: string;
  orderId: string;
  transactionId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: Date;
}

export interface IOrder {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  discountAmount: number;
  deliveryCharge: number;
  finalAmount: number;
  paymentStatus: PaymentStatus;
  couponCode?: string;
  deliveryAddress: IAddress;
  items: IOrderItem[];
  payment?: IPayment;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
