import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export interface OrderNotificationData {
  userName: string;
  userEmail: string;
  orderNumber: string;
  totalAmount: number;
  status?: string;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('MAIL_HOST', 'smtp.gmail.com'),
      port: this.config.get<number>('MAIL_PORT', 587),
      secure: false,
      auth: {
        user: this.config.get('MAIL_USER'),
        pass: this.config.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendOrderConfirmation(data: OrderNotificationData) {
    const subject = `Order Confirmed — #${data.orderNumber}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #16a34a;">Order Confirmed! 🎉</h1>
        <p>Hi ${data.userName},</p>
        <p>Your order <strong>#${data.orderNumber}</strong> has been confirmed.</p>
        <p>Total Amount: <strong>₹${data.totalAmount}</strong></p>
        <p>We'll notify you when your order is out for delivery.</p>
        <hr />
        <p style="color: #6b7280; font-size: 12px;">GOS Grocery — Fresh & Fast</p>
      </div>
    `;

    await this.sendEmail(data.userEmail, subject, html);
    this.logger.log(`Order confirmation sent to ${data.userEmail}`);
  }

  async sendOrderStatusUpdate(data: OrderNotificationData) {
    const subject = `Order Update — #${data.orderNumber}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Order Status Update</h1>
        <p>Hi ${data.userName},</p>
        <p>Your order <strong>#${data.orderNumber}</strong> status has been updated to: <strong>${data.status}</strong></p>
        <hr />
        <p style="color: #6b7280; font-size: 12px;">GOS Grocery — Fresh & Fast</p>
      </div>
    `;

    await this.sendEmail(data.userEmail, subject, html);
  }

  async sendOtpEmail(email: string, otp: string) {
    const subject = 'Your GOS Verification Code';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Your OTP code is:</p>
        <div style="font-size: 36px; font-weight: bold; color: #16a34a; letter-spacing: 8px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code expires in 5 minutes.</p>
        <p style="color: #ef4444;">Never share this code with anyone.</p>
      </div>
    `;

    await this.sendEmail(email, subject, html);
  }

  async sendPasswordResetEmail(email: string, resetLink: string) {
    const subject = 'Reset Your GOS Password';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset</h2>
        <p>Click the button below to reset your password. This link expires in 1 hour.</p>
        <a href="${resetLink}" style="
          display: inline-block;
          background: #16a34a;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          margin: 16px 0;
        ">Reset Password</a>
        <p style="color: #6b7280;">If you didn't request this, ignore this email.</p>
      </div>
    `;

    await this.sendEmail(email, subject, html);
  }

  private async sendEmail(to: string, subject: string, html: string) {
    if (!this.config.get('MAIL_USER')) {
      // Dev mode: just log
      this.logger.log(`📧 [DEV EMAIL] To: ${to} | Subject: ${subject}`);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: this.config.get('MAIL_FROM', '"GOS Grocery" <noreply@gos.com>'),
        to,
        subject,
        html,
      });
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
    }
  }

  // SMS stub — integrate MSG91 or Twilio here
  async sendSms(phone: string, message: string) {
    if (this.config.get('NODE_ENV') !== 'production') {
      this.logger.log(`📱 [DEV SMS] To: ${phone} | Message: ${message}`);
      return;
    }
    // TODO: Integrate MSG91
    // const msg91 = require('msg91');
    // ...
  }
}
