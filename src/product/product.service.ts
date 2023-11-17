import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm'

@Injectable()
export class ProductService {

constructor(
  @InjectRepository(Product)
  private productRepo : Repository<Product>
) {}

async createProduct() {}

async getProducts() {}

async getProductById() {}

async updateProductById() {}

async deleteProductById() {}



}
