import { IsString, IsOptional, Length, IsUrl, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Fresh Vegetables' })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
