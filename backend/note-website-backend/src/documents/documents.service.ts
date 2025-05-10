import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { ApiResponse, api } from 'src/common/utils/response.util';
import { Document } from '../common/entities/document.entity';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
    ) {}
    async createDocument(createDocumentDto: CreateDocumentDto): Promise<ApiResponse>{
        const { user_id, title, description, file_url, file_type, file_size, is_public } = createDocumentDto;

        const document = this.documentRepository.create({
            user_id,
            title,
            description,
            file_url,
            file_type,
            file_size,
            is_public
        });

        const newDocument = await this.documentRepository.save(document);
        return api()
        .setMessage('Document uploaded successfully!')
        .build();
    }
}
