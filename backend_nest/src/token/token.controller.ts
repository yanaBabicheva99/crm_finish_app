import type { FastifyRequest } from 'fastify';
import { Controller, Get, Req } from '@nestjs/common';

import { TokenService } from './token.service';

@Controller('api/auth/token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('/refresh')
  async refresh(@Req() request: FastifyRequest) {
    const { refreshToken } = request.cookies;
    const token = await this.tokenService.refreshToken(refreshToken);
    return token;
  }
}
