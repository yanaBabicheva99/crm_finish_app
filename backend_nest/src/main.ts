import type { FastifyCookieOptions } from '@fastify/cookie';
import fastifyCookie from '@fastify/cookie';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie, {
    secret: process.env.FASTIFY_SECRET,
    parseOptions: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    }, // for cookies signature
  } as FastifyCookieOptions);

  app.enableCors({credentials: true, origin: "http://localhost:3000"});
  await app.listen(PORT);
}
bootstrap();
