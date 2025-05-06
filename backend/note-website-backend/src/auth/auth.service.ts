import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ApiResponse, api } from 'src/common/utils/response.util';
import { User } from 'src/common/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {} // constructor

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email); // find user by email comlumn
    
    if (!user) {
      return null;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (isPasswordValid) {
      const { password, ...result } = user; // add password to result user object
      return result;
    }
    
    return null;
  }


  async login(email: string, password: string): Promise<ApiResponse> { // login method
    const user = await this.validateUser(email, password); // call validateUser to search for user then add to user object
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // if validateUser return null (dont have user)
    }

    const payload = { sub: user.id, email: user.email }; // create payload object with user id and email
    
    return api()
      .setMessage('Login successfully')
      .setResponse({
        accessToken: this.jwtService.sign(payload), // add accessToken in JSON res
        user: {
          email: user.email,
          full_name: user.full_name,
        },
      })
      .build();
  }

  async getUserFromToken(token: string): Promise<User> { 
    try {
      const payload = this.jwtService.verify(token);
      return this.usersService.findById(payload.sub);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}