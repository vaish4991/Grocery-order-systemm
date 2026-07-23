import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

export type UploadFolder = 'products' | 'categories' | 'banners' | 'invoices';

@Injectable()
export class UploadService {
  private s3: S3Client;
  private bucket: string;

  constructor(private config: ConfigService) {
    this.s3 = new S3Client({
      region: this.config.get('AWS_REGION', 'ap-south-1'),
      credentials: {
        accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucket = this.config.get('AWS_S3_BUCKET', 'gos-grocery-bucket');
  }

  async getPresignedUploadUrl(folder: UploadFolder, filename: string, contentType: string) {
    const extension = filename.split('.').pop();
    const key = `${folder}/${uuidv4()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(this.s3, command, { expiresIn: 300 }); // 5 minutes

    return {
      uploadUrl: url,
      fileKey: key,
      fileUrl: `https://${this.bucket}.s3.${this.config.get('AWS_REGION', 'ap-south-1')}.amazonaws.com/${key}`,
    };
  }

  async deleteFile(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    await this.s3.send(command);
    return { message: 'File deleted' };
  }
}
