import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  @IsOptional()
  title?: string;
  
  @IsString()
  @IsOptional()
  description?: string;
  
  @IsString()
  @IsOptional()
  file_url?: string;
  
  @IsString()
  @IsOptional()
  file_type?: string;
  
  @IsOptional()
  file_size?: number;
  
  @IsBoolean()
  @IsOptional()
  is_public?: boolean;
}