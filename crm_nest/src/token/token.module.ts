import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TokenSchema, Token } from './schema/token.schema';
import { Users, UsersSchema } from '../users/schema/users.schema';

@Module({
  providers: [TokenService],
  controllers: [TokenController],
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [TokenService, JwtModule],
})
export class TokenModule {}
