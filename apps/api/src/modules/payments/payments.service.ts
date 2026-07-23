import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { Payment } from '../orders/entities/payment.entity';
import { Order, PaymentStatus } from '../orders/entities/order.entity';

// Razorpay is imported as require to avoid TS declaration issues
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Razorpay = require('razorpay');

@Injectable()
export class PaymentsService {
  private razorpay: any;

  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private config: ConfigService,
  ) {
    const keyId = this.config.get('RAZORPAY_KEY_ID') || 'rzp_test_dummykey123';
    const keySecret = this.config.get('RAZORPAY_KEY_SECRET') || 'dummysecret123';

    this.razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  async initiatePayment(orderId: string, userId: string) {
    const order = await this.orderRepo.findOne({ where: { id: orderId, userId } });
    if (!order) throw new NotFoundException('Order not found');

    const keyId = this.config.get('RAZORPAY_KEY_ID') || 'rzp_test_dummykey123';

    // Create Razorpay order
    const razorpayOrder = await this.razorpay.orders.create({
      amount: Math.round(Number(order.finalAmount) * 100), // in paise
      currency: 'INR',
      receipt: order.orderNumber,
      notes: { orderId: order.id },
    });

    // Save Razorpay order ID
    await this.paymentRepo.update(
      { orderId },
      { razorpayOrderId: razorpayOrder.id },
    );

    return {
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId,
      orderNumber: order.orderNumber,
    };
  }

  async verifyPayment(dto: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    orderId: string;
  }) {
    const secret = this.config.get('RAZORPAY_KEY_SECRET') || 'dummysecret123';
    const body = `${dto.razorpayOrderId}|${dto.razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== dto.razorpaySignature) {
      throw new BadRequestException('Payment verification failed');
    }

    // Update payment and order
    await this.paymentRepo.update(
      { orderId: dto.orderId },
      {
        razorpayPaymentId: dto.razorpayPaymentId,
        razorpaySignature: dto.razorpaySignature,
        status: 'SUCCESS',
        transactionId: dto.razorpayPaymentId,
      },
    );

    await this.orderRepo.update(dto.orderId, {
      paymentStatus: PaymentStatus.SUCCESS,
      status: 'CONFIRMED' as any,
    });

    return { success: true, message: 'Payment verified successfully' };
  }

  async handleWebhook(payload: any, signature: string) {
    const secret = this.config.get('RAZORPAY_KEY_SECRET') || 'dummysecret123';
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new BadRequestException('Invalid webhook signature');
    }

    const event = payload.event;
    if (event === 'payment.captured') {
      const paymentId = payload.payload.payment.entity.id;
      const razorpayOrderId = payload.payload.payment.entity.order_id;

      const payment = await this.paymentRepo.findOne({ where: { razorpayOrderId } });
      if (payment) {
        await this.paymentRepo.update(payment.id, {
          status: 'SUCCESS',
          razorpayPaymentId: paymentId,
        });
        await this.orderRepo.update(payment.orderId, {
          paymentStatus: PaymentStatus.SUCCESS,
        });
      }
    }

    return { received: true };
  }
}
