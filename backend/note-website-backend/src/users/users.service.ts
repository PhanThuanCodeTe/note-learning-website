import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ApiResponse, api } from 'src/common/utils/response.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor( // constructor
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ApiResponse> { // create user method
    const { email, password, full_name, avatar_url } = createUserDto; 

    const existingUser = await this.userRepository.findOne({ where: { email } }); // check mail if it exist res back
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
    }; // return exact column not all

    return api() // api respone
      .setMessage('User created successfully')
      .setResponse(responseRegisteredUser)
      .build();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id: id.toString() } 
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async getUserInfo(userId: number): Promise<ApiResponse> {
    const user = await this.findById(userId);
    if (!user) {
      return api()
        .setError('User not found')
        .build();
    }

    // Calculate the user's age based on created_at
    const createdDate = new Date(user.created_at);
    const now = new Date();
    const ageInMilliseconds = now.getTime() - createdDate.getTime();
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

    return api()
      .setMessage('User info retrieved successfully')
      .setResponse({
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        age_in_days: ageInDays,
        created_at: user.created_at,
      })
      .build();
  }

  async login(email: string, password: string): Promise<ApiResponse> {
    const user = await this.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    const payload = { sub: user.id, email: user.email };
    
    return api()
      .setMessage('Login successful')
      .setResponse({
        accessToken: this.jwtService.sign(payload),
        // user: {
        //   id: user.id,
        //   email: user.email,
        //   full_name: user.full_name,
        //   avatar_url: user.avatar_url,
        // },
      })
      .build();
  }
}