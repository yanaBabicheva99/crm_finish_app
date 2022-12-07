import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/users.schema';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    TokenModule,
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
