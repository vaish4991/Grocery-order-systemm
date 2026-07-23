import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus, PaymentStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Payment, PaymentMethod } from './entities/payment.entity';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { Address } from '../users/entities/address.entity';
import { Coupon, DiscountType } from '../coupons/entities/coupon.entity';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
    @InjectRepository(Coupon) private couponRepo: Repository<Coupon>,
    private productsService: ProductsService,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    // 1. Get cart
    const cart = await this.cartRepo.findOne({
      where: { userId },
      relations: ['items', 'items.product', 'items.product.images'],
    });
    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // 2. Validate address
    const address = await this.addressRepo.findOne({
      where: { id: dto.addressId, userId },
    });
    if (!address) throw new NotFoundException('Address not found');

    // 3. Calculate amounts
    let totalAmount = cart.items.reduce((sum, item) => {
      const price = Number(item.product.discountPrice || item.product.price);
      return sum + price * item.quantity;
    }, 0);

    let discountAmount = 0;
    let couponCode: string | undefined;

    // 4. Apply coupon if provided
    if (dto.couponCode) {
      const coupon = await this.couponRepo.findOne({
        where: { code: dto.couponCode.toUpperCase(), isActive: true },
      });

      if (!coupon) throw new BadRequestException('Invalid coupon code');
      if (new Date() < coupon.startDate || new Date() > coupon.endDate) {
        throw new BadRequestException('Coupon is not valid at this time');
      }
      if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
        throw new BadRequestException('Coupon usage limit exceeded');
      }
      if (coupon.minOrderAmount && totalAmount < Number(coupon.minOrderAmount)) {
        throw new BadRequestException(
          `Minimum order amount for this coupon is ₹${coupon.minOrderAmount}`,
        );
      }

      if (coupon.discountType === DiscountType.PERCENTAGE) {
        discountAmount = (totalAmount * Number(coupon.discountValue)) / 100;
        if (coupon.maxDiscountAmount) {
          discountAmount = Math.min(discountAmount, Number(coupon.maxDiscountAmount));
        }
      } else {
        discountAmount = Number(coupon.discountValue);
      }

      couponCode = coupon.code;
      await this.couponRepo.increment({ id: coupon.id }, 'usageCount', 1);
    }

    const deliveryCharge = totalAmount > 500 ? 0 : 40; // Free delivery above ₹500
    const finalAmount = totalAmount - discountAmount + deliveryCharge;

    // 5. Generate order number
    const orderNumber = `GOS${Date.now()}`;

    // 6. Create order
    const order = await this.orderRepo.save(
      this.orderRepo.create({
        userId,
        orderNumber,
        totalAmount,
        discountAmount,
        deliveryCharge,
        finalAmount,
        couponCode,
        deliveryAddress: {
          fullName: address.fullName,
          phone: address.phone,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          country: address.country,
          postalCode: address.postalCode,
        },
        notes: dto.notes,
      }),
    );

    // 7. Create order items and update stock
    const orderItems = cart.items.map((item) =>
      this.orderItemRepo.create({
        orderId: order.id,
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.images?.[0]?.imageUrl,
        quantity: item.quantity,
        price: Number(item.product.discountPrice || item.product.price),
        totalPrice: Number(item.product.discountPrice || item.product.price) * item.quantity,
      }),
    );
    await this.orderItemRepo.save(orderItems);

    // 8. Update product stock
    for (const item of cart.items) {
      await this.productsService.updateStock(item.productId, item.quantity);
    }

    // 9. Create payment record
    const payment = await this.paymentRepo.save(
      this.paymentRepo.create({
        orderId: order.id,
        amount: finalAmount,
        method: dto.paymentMethod as PaymentMethod,
        status: 'PENDING',
      }),
    );

    // 10. Clear cart
    await this.cartItemRepo.delete({ cartId: cart.id });

    return {
      order: await this.findById(order.id, userId),
      paymentId: payment.id,
    };
  }

  async findAll(userId: string, page = 1, limit = 10) {
    const [orders, total] = await this.orderRepo.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { orders, total, page, limit };
  }

  async findById(id: string, userId?: string) {
    const where: any = { id };
    if (userId) where.userId = userId;

    const order = await this.orderRepo.findOne({
      where,
      relations: ['items', 'payment'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async cancelOrder(id: string, userId: string) {
    const order = await this.findById(id, userId);
    if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
      throw new BadRequestException('Order cannot be cancelled at this stage');
    }
    await this.orderRepo.update(id, { status: OrderStatus.CANCELLED });
    return this.findById(id);
  }

  // Admin methods
  async findAllAdmin(page = 1, limit = 20, status?: string) {
    const where: any = {};
    if (status) where.status = status;

    const [orders, total] = await this.orderRepo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { orders, total, page, limit };
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    await this.findById(id);
    await this.orderRepo.update(id, { status: dto.status });
    return this.findById(id);
  }

  async getDashboardStats() {
    const totalOrders = await this.orderRepo.count();
    const totalRevenue = await this.orderRepo
      .createQueryBuilder('order')
      .select('SUM(order.finalAmount)', 'revenue')
      .where('order.paymentStatus = :status', { status: 'SUCCESS' })
      .getRawOne();

    const recentOrders = await this.orderRepo.find({
      order: { createdAt: 'DESC' },
      take: 5,
    });

    return {
      totalOrders,
      totalRevenue: Number(totalRevenue?.revenue || 0),
      recentOrders,
    };
  }
}
