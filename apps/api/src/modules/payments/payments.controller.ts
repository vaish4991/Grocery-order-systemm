import { Controller, Post, Body, Param, Headers, RawBodyRequest, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';

class VerifyPaymentDto {
  @ApiProperty() @IsString() razorpayOrderId: string;
  @ApiProperty() @IsString() razorpayPaymentId: string;
  @ApiProperty() @IsString() razorpaySignature: string;
  @ApiProperty() @IsString() orderId: string;
}

@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('initiate/:orderId')
  @ApiOperation({ summary: 'Initiate Razorpay payment for an order' })
  initiatePayment(
    @Param('orderId') orderId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.paymentsService.initiatePayment(orderId, userId);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify Razorpay payment after successful payment' })
  verifyPayment(@Body() dto: VerifyPaymentDto) {
    return this.paymentsService.verifyPayment(dto);
  }

  @Public()
  @Post('webhook')
  @ApiOperation({ summary: 'Razorpay webhook handler' })
  handleWebhook(
    @Body() payload: any,
    @Headers('x-razorpay-signature') signature: string,
  ) {
    return this.paymentsService.handleWebhook(payload, signature);
  }
}
