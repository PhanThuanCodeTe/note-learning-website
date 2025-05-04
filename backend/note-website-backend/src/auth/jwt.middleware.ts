import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Thiếu hoặc sai định dạng token');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findOneByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('Người dùng không tồn tại');
      }
      req['user'] = { id: user.id, email: user.email };
      next();
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }
  }
}