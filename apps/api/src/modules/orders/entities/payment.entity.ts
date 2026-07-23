import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

export enum PaymentMethod {
  RAZORPAY = 'RAZORPAY',
  COD = 'COD',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @OneToOne(() => Order, (order) => order.payment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({ nullable: true })
  transactionId: string;

  @Column({ nullable: true })
  razorpayOrderId: string;

  @Column({ nullable: true })
  razorpayPaymentId: string;

  @Column({ nullable: true })
  razorpaySignature: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
    default: 'PENDING',
  })
  status: string;

  @Column({ type: 'enum', enum: PaymentMethod })
  method: PaymentMethod;

  @CreateDateColumn()
  createdAt: Date;
}
