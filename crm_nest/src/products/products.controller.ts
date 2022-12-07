import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Put,
  Patch,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../token/jwt-token.guard';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductRemoveDto } from './dto/product-remove.dto';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.productsService.getAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get/:id')
  get(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: ProductCreateDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: ProductUpdateDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/change/:id')
  change(@Param('id') id: string, @Body() changeProductDto: ProductCreateDto) {
    return this.productsService.changeProduct(id, changeProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/remove/:id')
  remove(@Param('id') id: string, @Body() removeProductDto: ProductRemoveDto) {
    return this.productsService.removeProduct(id, removeProductDto);
  }
}
