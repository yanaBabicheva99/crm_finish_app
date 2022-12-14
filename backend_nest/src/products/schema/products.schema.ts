import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Users } from '../../users/schema/users.schema';

export type ProductsDocument = Products & Document;

@Schema()
export class Products {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  user: Users;

  @Prop({ required: true })
  store: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  price: string;

  @Prop()
  creationData: string;

  @Prop({ required: true })
  weight: string;

  @Prop({ required: true })
  remains: number;

  @Prop({ default: '' })
  day: string;

  @Prop({ default: '' })
  lastSale: string;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: '' })
  lastSalePrice: string;

  @Prop({ default: 0 })
  revenue: number;

  @Prop({ default: false })
  delete: boolean;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
