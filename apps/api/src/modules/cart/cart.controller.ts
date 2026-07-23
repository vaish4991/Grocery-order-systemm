import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

class AddToCartDto {
  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty({ default: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

class UpdateCartItemDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity: number;
}

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: "Get current user's cart" })
  getCart(@CurrentUser('id') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add product to cart' })
  addItem(@CurrentUser('id') userId: string, @Body() dto: AddToCartDto) {
    return this.cartService.addItem(userId, dto.productId, dto.quantity);
  }

  @Patch('items/:itemId')
  @ApiOperation({ summary: 'Update cart item quantity (set 0 to remove)' })
  updateItem(
    @CurrentUser('id') userId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(userId, itemId, dto.quantity);
  }

  @Delete('items/:itemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  removeItem(@CurrentUser('id') userId: string, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(userId, itemId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear entire cart' })
  clearCart(@CurrentUser('id') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
