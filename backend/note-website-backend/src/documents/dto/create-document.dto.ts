import { IsString, IsNotEmpty, IsOptional, IsUrl, IsBoolean, IsNumber, IsUUID } from 'class-validator';

export class CreateDocumentDto {
    @IsUUID()
    @IsNotEmpty()
    user_id: string;
  
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsNotEmpty()
    file_url: string;
  
    @IsString()
    @IsNotEmpty()
    file_type: string;
  
    @IsNumber()
    @IsNotEmpty()
    file_size: number;
  
    @IsBoolean()
    @IsOptional()
    is_public?: boolean;
  }