import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private tokenService: TokenService,
  ) {}

  async login(loginDto: LoginAuthDto) {
    const candidate = await this.validateUser(loginDto);
    const token = await this.tokenService.generateToken(candidate);
    await this.tokenService.saveToken(candidate._id, token.refreshToken);
    return { ...token, userId: candidate._id };
  }

  async register(registerDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(registerDto.email);
    if (candidate) {
      throw new HttpException(
        'This email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(registerDto.password, 5);
    const user = this.userService.createUser({
      ...registerDto,
      password: hashPassword,
    });
    return user;
  }

  private async validateUser(userDto: LoginAuthDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }

  async logout(refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }
}
