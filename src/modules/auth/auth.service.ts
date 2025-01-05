import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../../dto/auth/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, role } = loginDto;

    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const payload = { username, role: role };

    const token = jwt.sign(
      payload,
      this.configService.get<string>('JWT_SECRET'),
      {
        expiresIn: '1h',
      },
    );

    return { token };
  }
}
