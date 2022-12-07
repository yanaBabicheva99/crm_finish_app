import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './schema/token.schema';
import { Users, UsersDocument } from '../users/schema/users.schema';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(user) {
    const payload = { email: user.email, userId: user._id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      // secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await new this.tokenModel({
      user: userId,
      refreshToken,
    });
    return token.save();
  }

  validateRefreshToken(token: string) {
    const userData = this.jwtService.verify(token);
    return userData;
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException({
        message: 'The user is not Authorized',
      });
    }

    const userData = this.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenModel.findOne({ refreshToken });

    if (!userData && !tokenFromDb) {
      throw new UnauthorizedException({
        message: 'The user is not Authorized',
      });
    }

    const user = await this.userModel.findById(userData.userId);
    const tokens = await this.generateToken(user);
    await this.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, userId: user._id };
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }
}
