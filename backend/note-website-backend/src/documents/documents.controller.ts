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
    BadRequestException
  } from '@nestjs/common';
  import { DocumentsService } from './documents.service';
  import { CreateDocumentDto } from './dto/create-document.dto';
  import { UpdateDocumentDto } from './dto/update-document.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ApiResponse } from 'src/common/utils/response.util';
  import { Request } from 'express';
  
  @Controller('documents')
  export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard) // Apply JWT authentication guard
    async createDocument(
      @Body() createDocumentDto: CreateDocumentDto,
      @Req() req: Request,
    ): Promise<ApiResponse> {
      // Get the authenticated user from the request
      const user = req.user as any; // Type assertion for TypeScript
      if (!user) {
        throw new UnauthorizedException('User not authenticated');
      }
  
      // Add user_id to the createDocumentDto
      const documentWithUserId = {
        ...createDocumentDto,
        user_id: user.id, // Access id directly
      };
  
      return this.documentsService.createDocument(documentWithUserId);
    }
  
    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllDocuments(@Req() req: Request): Promise<ApiResponse> {
      const user = req.user as any; // Type assertion for TypeScript
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
      const user = req.user as any; // Type assertion for TypeScript
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
    async updateDocument(
      @Param('id') id: string,
      @Body() updateDocumentDto: UpdateDocumentDto,
      @Req() req: Request,
    ): Promise<ApiResponse> {
      const user = req.user as any; // Type assertion for TypeScript
      
      // Check if user owns the document
      const document = await this.documentsService.findOneRaw(id);
      if (!document) {
        throw new NotFoundException('Document not found');
      }
      
      if (document.user_id !== user.id) {
        throw new UnauthorizedException('You do not have permission to update this document');
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
      
      const user = req.user as any; // Type assertion for TypeScript
      
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
      const user = req.user as any; // Type assertion for TypeScript
      
      // Check if user owns the document
      const document = await this.documentsService.findOneRaw(id);
      if (!document) {
        throw new NotFoundException('Document not found');
      }
      
      if (document.user_id !== user.id) {
        throw new UnauthorizedException('You do not have permission to delete this document');
      }
      
      return this.documentsService.remove(id);
    }
  }