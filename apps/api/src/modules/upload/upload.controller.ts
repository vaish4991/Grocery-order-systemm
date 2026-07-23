import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UploadService, UploadFolder } from './upload.service';
import { Roles } from '../auth/decorators/roles.decorator';

class GetUploadUrlDto {
  @ApiProperty({ enum: ['products', 'categories', 'banners', 'invoices'] })
  @IsEnum(['products', 'categories', 'banners', 'invoices'])
  folder: UploadFolder;

  @ApiProperty({ example: 'product-image.jpg' })
  @IsString()
  filename: string;

  @ApiProperty({ example: 'image/jpeg' })
  @IsString()
  contentType: string;
}

@ApiTags('Upload')
@ApiBearerAuth()
@Roles('ADMIN')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('presigned-url')
  @ApiOperation({ summary: '[Admin] Get S3 presigned URL for file upload' })
  getPresignedUrl(@Body() dto: GetUploadUrlDto) {
    return this.uploadService.getPresignedUploadUrl(dto.folder, dto.filename, dto.contentType);
  }

  @Delete(':key')
  @ApiOperation({ summary: '[Admin] Delete a file from S3' })
  deleteFile(@Param('key') key: string) {
    return this.uploadService.deleteFile(key);
  }
}
