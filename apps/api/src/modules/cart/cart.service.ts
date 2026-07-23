import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  private async getOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepo.findOne({
      where: { userId },
      relations: ['items', 'items.product', 'items.product.images'],
    });
    if (!cart) {
      cart = await this.cartRepo.save(this.cartRepo.create({ userId }));
      cart.items = [];
    }
    return cart;
  }

  async getCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    return this.enrichCart(cart);
  }

  async addItem(userId: string, productId: string, quantity: number) {
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.stock < quantity) {
      throw new BadRequestException(`Only ${product.stock} items available in stock`);
    }

    const cart = await this.getOrCreateCart(userId);

    let item = cart.items.find((i) => i.productId === productId);
    if (item) {
      const newQty = item.quantity + quantity;
      if (product.stock < newQty) {
        throw new BadRequestException(`Only ${product.stock} items available in stock`);
      }
      await this.cartItemRepo.update(item.id, { quantity: newQty });
    } else {
      await this.cartItemRepo.save(
        this.cartItemRepo.create({ cartId: cart.id, productId, quantity }),
      );
    }

    return this.getCart(userId);
  }

  async updateItem(userId: string, itemId: string, quantity: number) {
    const cart = await this.getOrCreateCart(userId);
    const item = cart.items.find((i) => i.id === itemId);
    if (!item) throw new NotFoundException('Cart item not found');

    if (quantity <= 0) {
      await this.cartItemRepo.delete(itemId);
    } else {
      const product = await this.productRepo.findOne({ where: { id: item.productId } });
      if (product && product.stock < quantity) {
        throw new BadRequestException(`Only ${product.stock} items available in stock`);
      }
      await this.cartItemRepo.update(itemId, { quantity });
    }

    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await this.getOrCreateCart(userId);
    const item = cart.items.find((i) => i.id === itemId);
    if (!item) throw new NotFoundException('Cart item not found');

    await this.cartItemRepo.delete(itemId);
    return this.getCart(userId);
  }

  async clearCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    await this.cartItemRepo.delete({ cartId: cart.id });
    return { message: 'Cart cleared' };
  }

  private enrichCart(cart: Cart) {
    const totalAmount = cart.items.reduce((sum, item) => {
      const price = item.product?.discountPrice || item.product?.price || 0;
      return sum + Number(price) * item.quantity;
    }, 0);

    return {
      id: cart.id,
      items: cart.items,
      totalItems: cart.items.reduce((sum, i) => sum + i.quantity, 0),
      totalAmount: Number(totalAmount.toFixed(2)),
    };
  }
}
