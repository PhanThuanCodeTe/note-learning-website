import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}

      async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, full_name, avatar_url } = createUserDto; // destructure the dto to get the values

        const hashedPassword = await bcrypt.hash(password, 10); // hash password using bcrypt

        const user = this.userRepository.create({
          email,
          password: hashedPassword,
          full_name,
          avatar_url,
        }); // create a new user object using the dto add hashed password

        return this.userRepository.save(user);
      }
}
