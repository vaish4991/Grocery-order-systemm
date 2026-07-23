import { IsString, IsOptional, Length, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(/^[6-9]\d{9}$/)
  phone?: string;
}

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  @Length(2, 100)
  fullName: string;

  @ApiProperty()
  @IsString()
  @Matches(/^[6-9]\d{9}$/)
  phone: string;

  @ApiProperty()
  @IsString()
  @Length(5, 255)
  addressLine1: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 255)
  addressLine2?: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  city: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  state: string;

  @ApiProperty({ default: 'India' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d{6}$/, { message: 'Enter a valid 6-digit PIN code' })
  postalCode: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  isDefault?: boolean;
}
