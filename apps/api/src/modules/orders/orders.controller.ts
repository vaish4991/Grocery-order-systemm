import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Customer endpoints
  @Post('orders')
  @ApiOperation({ summary: 'Place a new order from cart' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(userId, dto);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get order history' })
  findAll(
    @CurrentUser('id') userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.ordersService.findAll(userId, page, limit);
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get order details' })
  findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.ordersService.findById(id, userId);
  }

  @Patch('orders/:id/cancel')
  @ApiOperation({ summary: 'Cancel an order' })
  cancel(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.ordersService.cancelOrder(id, userId);
  }

  // Admin endpoints
  @Get('admin/orders')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[Admin] List all orders' })
  findAllAdmin(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('status') status?: string,
  ) {
    return this.ordersService.findAllAdmin(page, limit, status);
  }

  @Get('admin/orders/:id')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[Admin] Get order details' })
  findOneAdmin(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Patch('admin/orders/:id/status')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[Admin] Update order status' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, dto);
  }

  @Get('admin/dashboard/stats')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[Admin] Dashboard statistics' })
  dashboardStats() {
    return this.ordersService.getDashboardStats();
  }
}
