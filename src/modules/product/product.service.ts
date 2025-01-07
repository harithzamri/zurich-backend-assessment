import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entity/product.entity';
import { Repository } from 'typeorm';
import { FindProductDto } from '../../dto/product/find-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(query: FindProductDto): Promise<Product[]> {
    const { location, productCode } = query;

    const whereConditions: any = {};
    if (location) {
      whereConditions.location = location;
    }
    if (productCode) {
      whereConditions.productCode = productCode;
    }

    return this.productRepository.find({
      where: whereConditions,
    });
  }

  async create(data: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { productCode: data.productCode },
    });

    if (existingProduct) {
      throw new BadRequestException(
        `Product code "${data.productCode}" already exists.`,
      );
    }

    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async update(productCode: string, data: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { productCode: productCode },
    });

    if (!product) {
      throw new NotFoundException(`Product with code ${productCode} not found`);
    }

    product.location = data.location;
    product.price = data.price;

    return await this.productRepository.save(product);
  }

  async delete(productCode: string): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { productCode: productCode },
    });

    if (!product) {
      throw new NotFoundException(`Product with code ${productCode} not found`);
    }

    await this.productRepository.delete({ productCode });
  }
}
