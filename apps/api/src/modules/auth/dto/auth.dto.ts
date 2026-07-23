import { IsEmail, IsString, MinLength, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '9876543210' })
  @IsString()
  @Matches(/^[6-9]\d{9}$/, { message: 'Invalid Indian mobile number' })
  phone: string;

  @ApiProperty({ example: 'Password@123' })
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
    message: 'Password must contain uppercase, lowercase, and number',
  })
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password@123' })
  @IsString()
  password: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '9876543210' })
  @IsString()
  @Matches(/^[6-9]\d{9}$/)
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6)
  otp: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
    message: 'Password must contain uppercase, lowercase, and number',
  })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
