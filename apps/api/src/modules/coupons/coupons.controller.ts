import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CouponsService, CreateCouponDto } from './coupons.service';
import { Roles } from '../auth/decorators/roles.decorator';

class ApplyCouponDto {
  @ApiProperty() @IsString() code: string;
  @ApiProperty() @IsNumber() @Type(() => Number) orderAmount: number;
}

@ApiTags('Coupons')
@ApiBearerAuth()
@Controller()
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post('coupons/apply')
  @ApiOperation({ summary: 'Validate and apply a coupon code' })
  applyCoupon(@Body() dto: ApplyCouponDto) {
    return this.couponsService.applyCoupon(dto.code, dto.orderAmount);
  }

  @Get('admin/coupons')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[Admin] List all coupons' })
  findAll() {
    return this.couponsService.findAll();
  }

  @Post('admin/coupons')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[Admin] Create coupon' })
  create(@Body() dto: CreateCouponDto) {
    return this.couponsService.create(dto);
  }

  @Patch('admin/coupons/:id')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[Admin] Update coupon' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateCouponDto>) {
    return this.couponsService.update(id, dto);
  }

  @Delete('admin/coupons/:id')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[Admin] Delete coupon' })
  delete(@Param('id') id: string) {
    return this.couponsService.delete(id);
  }
}
