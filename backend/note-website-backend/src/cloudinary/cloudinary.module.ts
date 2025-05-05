import { Module } from '@nestjs/common';
import { CloudinaryConfig } from '../config/cloudinary.config';

@Module({
  providers: [CloudinaryConfig],
  exports: [CloudinaryConfig],
})
export class CloudinaryModule {}
