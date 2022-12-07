import type { FastifyRequest, FastifyReply } from 'fastify';
import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';


@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const userData = await this.authService.login(loginAuthDto);
    response.setCookie('refreshToken', userData.refreshToken);
    return userData;
  }

  @Post('/register')
  register(@Body() registerAuthDto: CreateUserDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('/logout')
  async logout(@Req() request: FastifyRequest, @Res() response: FastifyReply) {
    const { refreshToken } = request.cookies;
    const token = await this.authService.logout(refreshToken);
    response.clearCookie('refreshToken');
    return token;
  }
}
