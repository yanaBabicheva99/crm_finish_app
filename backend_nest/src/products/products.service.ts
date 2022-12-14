import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from './schema/products.schema';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductChangeDto } from './dto/product-change.dto';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductRemoveDto } from './dto/product-remove.dto';

@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>,
    @Inject(REQUEST) private readonly request: Request | any,
  ) {}

  async getAllProducts() {
    const products = await this.productsModel.find({
      user: this.request?.user.userId,
    });
    return products;
  }

  async getProduct(id: string) {
    const product = await this.productsModel.findById(id);
    return product;
  }

  async createProduct(productDto: ProductCreateDto) {
    const product = await new this.productsModel({
      user: this.request?.user.userId,
      ...productDto,
    });
    return product.save();
  }

  async changeProduct(id: string, productDto: ProductChangeDto) {
    const product = await this.productsModel.findByIdAndUpdate(id, productDto, {
      new: true,
    });
    return product;
  }

  async updateProduct(id: string, productDto: ProductUpdateDto) {
    const product = await this.productsModel.findByIdAndUpdate(id, productDto, {
      new: true,
    });
    return product;
  }

  async removeProduct(id: string, productDto: ProductRemoveDto) {
    const product = await this.productsModel.findByIdAndUpdate(id, productDto, {
      new: true,
    });
    return product;
  }
}
