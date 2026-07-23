import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/entities/user.entity';
import { OtpCode, RefreshToken } from './entities/auth.entity';
import { RegisterDto, LoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(OtpCode)
    private otpRepo: Repository<OtpCode>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  // ── Register ─────────────────────────────────────────────────────────────
  async register(dto: RegisterDto) {
    const existingEmail = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existingEmail) throw new ConflictException('Email already registered');

    const existingPhone = await this.userRepo.findOne({ where: { phone: dto.phone } });
    if (existingPhone) throw new ConflictException('Phone already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const user = this.userRepo.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      password: hashedPassword,
    });
    await this.userRepo.save(user);

    // Send OTP
    await this.sendOtp(dto.phone);

    return { message: 'Registration successful. Please verify your phone number.' };
  }

  // ── Send OTP ─────────────────────────────────────────────────────────────
  async sendOtp(phone: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await this.otpRepo.save(
      this.otpRepo.create({ phone, code: otp, expiresAt }),
    );

    // In development, log OTP to console
    console.log(`📱 OTP for ${phone}: ${otp}`);

    // TODO: In production, send via SMS provider (MSG91 / Twilio)
    return { message: `OTP sent to ${phone}` };
  }

  // ── Verify OTP ────────────────────────────────────────────────────────────
  async verifyOtp(dto: VerifyOtpDto) {
    const otpRecord = await this.otpRepo.findOne({
      where: { phone: dto.phone, code: dto.otp, isUsed: false },
      order: { createdAt: 'DESC' },
    });

    if (!otpRecord) throw new BadRequestException('Invalid OTP');
    if (new Date() > otpRecord.expiresAt) throw new BadRequestException('OTP has expired');

    // Mark OTP as used
    await this.otpRepo.update(otpRecord.id, { isUsed: true });

    // Mark user phone as verified
    const user = await this.userRepo.findOne({ where: { phone: dto.phone } });
    if (!user) throw new NotFoundException('User not found');

    await this.userRepo.update(user.id, { isPhoneVerified: true });

    return this.generateTokens(user);
  }

  // ── Login ─────────────────────────────────────────────────────────────────
  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
      select: ['id', 'name', 'email', 'phone', 'role', 'status', 'password', 'isPhoneVerified'],
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    if (user.status === 'BANNED') throw new UnauthorizedException('Account has been banned');

    return this.generateTokens(user);
  }

  // ── Forgot Password ───────────────────────────────────────────────────────
  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      // Return success even if email not found (security)
      return { message: 'If your email is registered, you will receive a reset link.' };
    }

    const resetToken = uuidv4();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.refreshTokenRepo.save(
      this.refreshTokenRepo.create({
        userId: user.id,
        token: await bcrypt.hash(resetToken, 10),
        expiresAt,
      }),
    );

    // TODO: Send email with reset link
    console.log(`📧 Password reset token for ${user.email}: ${resetToken}`);

    return { message: 'If your email is registered, you will receive a reset link.' };
  }

  // ── Reset Password ────────────────────────────────────────────────────────
  async resetPassword(dto: ResetPasswordDto) {
    const tokenRecord = await this.refreshTokenRepo.findOne({
      where: { isRevoked: false },
      order: { createdAt: 'DESC' },
    });

    if (!tokenRecord) throw new BadRequestException('Invalid or expired reset token');
    if (new Date() > tokenRecord.expiresAt) throw new BadRequestException('Reset token has expired');

    const isTokenValid = await bcrypt.compare(dto.token, tokenRecord.token);
    if (!isTokenValid) throw new BadRequestException('Invalid reset token');

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    await this.userRepo.update(tokenRecord.userId, { password: hashedPassword });
    await this.refreshTokenRepo.update(tokenRecord.id, { isRevoked: true });

    return { message: 'Password reset successful. Please login.' };
  }

  // ── Refresh Token ─────────────────────────────────────────────────────────
  async refreshTokens(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.userRepo.findOne({ where: { id: payload.sub } });
      if (!user) throw new UnauthorizedException();

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  // ── Private: Generate tokens ──────────────────────────────────────────────
  private async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret:
        this.config.get('JWT_ACCESS_SECRET') ||
        this.config.get('JWT_SECRET') ||
        'gos_default_access_secret_key_123456789_dev',
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN', '15m'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret:
        this.config.get('JWT_REFRESH_SECRET') ||
        'gos_default_refresh_secret_key_123456789_dev',
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      tokens: { accessToken, refreshToken },
    };
  }
}
