import { Controller, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register') // define endpoint
    async register(@Body() createUserDto: CreateUserDto) { // use async to handle request, dto to validate request body
        return this.usersService.createUser(createUserDto); // call service to create a new user
    }
}
