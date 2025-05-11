import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  @IsOptional()
  title?: string;
  
  @IsString()
  @IsOptional()
  description?: string;
  
  @IsBoolean()
  @IsOptional()
  is_public?: boolean;
}