import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { ApiResponse, api } from 'src/common/utils/response.util';
import { Document } from '../common/entities/document.entity';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
    ) {}
    async createDocument(createDocumentDto: CreateDocumentDto): Promise<ApiResponse> {
        const document = this.documentRepository.create(createDocumentDto);
        const newDocument = await this.documentRepository.save(document);
        
        return api()
          .setMessage('Document uploaded successfully!')
          .setResponse(newDocument)
          .build();
      }

      async findAllByUserId(userId: string): Promise<ApiResponse> {
        const documents = await this.documentRepository.find({
          where: { user_id: userId },
          order: { created_at: 'DESC' },
        });
    
        return api()
          .setMessage('Documents retrieved successfully')
          .setResponse(documents)
          .build();
      }

      async findAllPublic(): Promise<ApiResponse> {
        const documents = await this.documentRepository.find({
          where: { is_public: true },
          order: { created_at: 'DESC' },
        });
    
        return api()
          .setMessage('Public documents retrieved successfully')
          .setResponse(documents)
          .build();
      }

      async findOne(id: string): Promise<ApiResponse> {
        const document = await this.documentRepository.findOne({
          where: { id },
        });
    
        if (!document) {
          throw new NotFoundException(`Document with ID ${id} not found`);
        }
    
        return api()
          .setMessage('Document retrieved successfully')
          .setResponse(document)
          .build();
      }

       // This method returns the raw document entity for internal checks
  async findOneRaw(id: string): Promise<Document | null> {
    return this.documentRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<ApiResponse> {
    const document = await this.findOneRaw(id);
    
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    // Update document properties
    await this.documentRepository.update(id, updateDocumentDto);
    
    // Get the updated document
    const updatedDocument = await this.findOneRaw(id);

    return api()
      .setMessage('Document updated successfully')
      .setResponse(updatedDocument)
      .build();
  }

  async updateVisibility(id: string, isPublic: boolean): Promise<ApiResponse> {
    const document = await this.findOneRaw(id);
    
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    // Update document visibility
    await this.documentRepository.update(id, { is_public: isPublic });
    
    return api()
      .setMessage(`Document visibility ${isPublic ? 'made public' : 'made private'} successfully`)
      .build();
  }

  async remove(id: string): Promise<ApiResponse> {
    const document = await this.findOneRaw(id);
    
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    await this.documentRepository.delete(id);

    return api()
      .setMessage('Document deleted successfully')
      .build();
  }
}
