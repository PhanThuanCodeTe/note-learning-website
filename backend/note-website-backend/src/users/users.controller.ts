import {
  Controller,
  Body,
  Post,
  Get,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register') // define endpoint
  async register(@Body() createUserDto: CreateUserDto) {
    // use async to handle request, dto to validate request body
    return this.usersService.createUser(createUserDto); // call service to create a new user
  }

  @Get('info') // define endpoint
  async getInfo(@Request() req) {
    const user = await this.usersService.findOneByEmail(req.user.email); // get user from request object
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      email: user.email,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
    };
  }
}
