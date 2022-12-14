import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Param,
  Scope,
} from '@nestjs/common';
import { Users, UsersDocument } from './schema/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/user.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as bcrypt from 'bcryptjs';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserChangeDto } from './dto/user-change.dto';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    @Inject(REQUEST) private readonly request: Request | any,
  ) {}

  async getUser() {
    const user = await this.usersModel.findById(this.request?.user.userId);
    return user;
  }

  async createUser(userDto: CreateUserDto) {
    const user = new this.usersModel(userDto);
    return user.save();
  }

  async getUserByEmail(email: string) {
    const candidate = await this.usersModel.findOne({ email });
    return candidate;
  }

  async updateUser(userUpdate: UserUpdateDto) {
    const user = await this.usersModel.findByIdAndUpdate(
      this.request?.user.userId,
      userUpdate,
      { new: true },
    );
    return user;
  }

  async changeUser(userChange: UserChangeDto) {
    const user = await this.getUserByEmail(userChange.email);
    const passwordEquals = await bcrypt.compare(
      userChange.oldPassword,
      user.password,
    );

    if (passwordEquals) {
      const hashPassword = await bcrypt.hash(userChange.newPassword, 5);
      const { oldPassword, newPassword, ...updatedUser } = userChange;

      const user = await this.usersModel.findByIdAndUpdate(
        this.request?.user.userId,
        { ...updatedUser, password: hashPassword },
        { new: true },
      );

      return user;
    } else {
      throw new HttpException(
        "Passwords don't match, try again",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
