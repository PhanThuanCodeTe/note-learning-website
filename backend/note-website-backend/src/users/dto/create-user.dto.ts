// validate input when create a new user
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsString()
    @IsNotEmpty()
    full_name: string;
  
    @IsOptional()
    @IsString()
    avatar_url?: string;
  }