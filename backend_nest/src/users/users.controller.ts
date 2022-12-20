import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  UseGuards,
  Put, ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../token/jwt-token.guard';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserChangeDto } from './dto/user-change.dto';

//http://localhost:5000/api/auth/
@Controller('api/auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body(new ValidationPipe()) userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get')
  get() {
    return this.usersService.getUser();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  update(@Body(new ValidationPipe()) userUpdateDto: UserUpdateDto) {
    return this.usersService.updateUser(userUpdateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/change')
  change(@Body(new ValidationPipe()) userChangeDto: UserChangeDto) {
    return this.usersService.changeUser(userChangeDto);
  }
}
