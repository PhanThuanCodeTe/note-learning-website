import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryConfig {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  getCloudinaryStorage() {
    return new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {},
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<any> {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'avatars',
        resource_type: 'auto',
        // Không chỉ định format cụ thể, để Cloudinary tự xác định
        transformation: [{ width: 150, height: 150, crop: 'fill' }],
      });
      
      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  async deleteImage(publicId: string): Promise<any> {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }

  async uploadDocument(file: Express.Multer.File): Promise<any> {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'documents',
        resource_type: 'auto',
      });
      
      return {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        resource_type: result.resource_type,
      };
    } catch (error) {
      throw new Error(`Failed to upload document: ${error.message}`);
    }
  }

  async deleteFile(publicId: string): Promise<any> {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
  
}