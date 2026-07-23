import { IsUUID, IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @ApiProperty()
  @IsUUID()
  addressId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  couponCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ enum: ['RAZORPAY', 'COD'] })
  @IsEnum(['RAZORPAY', 'COD'])
  paymentMethod: 'RAZORPAY' | 'COD';
}

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
