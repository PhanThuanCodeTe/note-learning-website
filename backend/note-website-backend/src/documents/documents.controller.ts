import { 
  Controller, 
  Body, 
  Post, 
  Get, 
  Patch, 
  Delete,
  Param, 
  UseGuards, 
  Req, 
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiResponse } from 'src/common/utils/response.util';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { CloudinaryConfig } from 'src/config/cloudinary.config';
import { removeFile } from 'src/common/utils/file.util';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly cloudinaryConfig: CloudinaryConfig
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = file.originalname.split('.').pop();
          cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  async createDocument(
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<ApiResponse> {
    try {
      // Get the authenticated user from the request
      const user = req.user as any;
      if (!user) {
        throw new UnauthorizedException('User not authenticated');
      }

      if (!file) {
        throw new BadRequestException('File is required');
      }

      // Upload file to Cloudinary
      const uploadResult = await this.cloudinaryConfig.uploadDocument(file);

      // Determine file type
      const fileType = file.mimetype;

      // Create document data
      const documentData = {
        ...createDocumentDto,
        user_id: user.id,
        file_url: uploadResult.url,
        file_type: fileType,
        public_id: uploadResult.public_id
      };

      return this.documentsService.createDocument(documentData);
    } catch (error) {
      throw new BadRequestException(`Failed to upload document: ${error.message}`);
    } finally {
      // Delete temp file
      if (file && file.path) {
        removeFile(file.path);
      }
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllDocuments(@Req() req: Request): Promise<ApiResponse> {
    const user = req.user as any;
    return this.documentsService.findAllByUserId(user.id);
  }

  @Get('public')
  async getPublicDocuments(): Promise<ApiResponse> {
    return this.documentsService.findAllPublic();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getDocument(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ApiResponse> {
    const user = req.user as any;
    const documentResponse = await this.documentsService.findOne(id);
    const document = documentResponse.response;
    
    // Check if document exists
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    
    // Check if user owns the document or if it's public
    if (document.user_id !== user.id && !document.is_public) {
      throw new UnauthorizedException('You do not have permission to access this document');
    }
    
    return documentResponse;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = file.originalname.split('.').pop();
          cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  async updateDocument(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<ApiResponse> {
    const user = req.user as any;
    
    // Check if user owns the document
    const document = await this.documentsService.findOneRaw(id);
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    
    if (document.user_id !== user.id) {
      throw new UnauthorizedException('You do not have permission to update this document');
    }

    // If a new file is uploaded, update file information
    if (file) {
      try {
        // Delete the old file from Cloudinary if there's a public_id
        if (document.public_id) {
          await this.cloudinaryConfig.deleteFile(document.public_id);
        }
        
        // Upload new file
        const uploadResult = await this.cloudinaryConfig.uploadDocument(file);
        
        // Update document data
        updateDocumentDto['file_url'] = uploadResult.url;
        updateDocumentDto['file_type'] = file.mimetype;
        updateDocumentDto['public_id'] = uploadResult.public_id;
      } catch (error) {
        throw new BadRequestException(`Failed to update file: ${error.message}`);
      } finally {
        // Delete temp file
        if (file.path) {
          removeFile(file.path);
        }
      }
    }
    
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Patch(':id/visibility')
  @UseGuards(JwtAuthGuard)
  async toggleVisibility(
    @Param('id') id: string, 
    @Body('is_public') isPublic: boolean,
    @Req() req: Request,
  ): Promise<ApiResponse> {
    if (isPublic === undefined) {
      throw new BadRequestException('is_public field is required');
    }
    
    const user = req.user as any;
    
    // Check if user owns the document
    const document = await this.documentsService.findOneRaw(id);
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    
    if (document.user_id !== user.id) {
      throw new UnauthorizedException('You do not have permission to update this document');
    }
    
    return this.documentsService.updateVisibility(id, isPublic);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteDocument(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ApiResponse> {
    const user = req.user as any;
    
    // Check if user owns the document
    const document = await this.documentsService.findOneRaw(id);
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    
    if (document.user_id !== user.id) {
      throw new UnauthorizedException('You do not have permission to delete this document');
    }
    
    // Delete file from Cloudinary if public_id exists
    if (document.public_id) {
      try {
        await this.cloudinaryConfig.deleteFile(document.public_id);
      } catch (error) {
        console.error(`Error deleting file from Cloudinary: ${error.message}`);
      }
    }
    
    return this.documentsService.remove(id);
  }
}