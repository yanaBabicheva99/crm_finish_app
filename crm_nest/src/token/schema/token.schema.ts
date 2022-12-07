import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Users } from '../../users/schema/users.schema';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  user: Users;

  @Prop({ required: true })
  refreshToken: string;
}
export const TokenSchema = SchemaFactory.createForClass(Token);
