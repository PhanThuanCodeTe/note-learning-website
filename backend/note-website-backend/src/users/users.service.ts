import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ApiResponse, api } from 'src/common/utils/response.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ApiResponse> {
    const { email, password, full_name, avatar_url } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      return api()
        .setError('Email already exists')
        .build();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      full_name,
      avatar_url,
    });

    const newUser = await this.userRepository.save(user);

    const responseRegisteredUser = {
      email: newUser.email,
      full_name: newUser.full_name,
      avatar_url: newUser.avatar_url,
    };

    return api()
      .setMessage('User created successfully')
      .setResponse(responseRegisteredUser)
      .build();
  }
}