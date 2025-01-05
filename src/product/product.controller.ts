import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../entity/product.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { RoleGuard } from '../common/guards/role.guard';
import { Role } from '../common/decorators/role.decorators';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { FindProductDto } from '../dto/product/find-product.dto';
import {
  CreateProductResponseDto,
  DeleteProductResponseDto,
  FindProductsResponseDto,
  UpdateProductResponseDto,
} from '../dto/product/response.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products with optional filters' })
  @ApiQuery({
    name: 'location',
    required: false,
    description: 'Filter by location',
  })
  @ApiQuery({
    name: 'productCode',
    required: false,
    description: 'Filter by product code',
  })
  async findAll(
    @Query() query: FindProductDto,
  ): Promise<FindProductsResponseDto> {
    const products = await this.productService.findAll(query);
    return { success: true, data: products, total: products.length };
  }

  @Post()
  @Role('admin')
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateProductDto })
  @ApiOperation({ summary: 'Create a new product (Admin only)' })
  async create(
    @Body() product: CreateProductDto,
  ): Promise<CreateProductResponseDto> {
    const newProduct = await this.productService.create(product);
    return {
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    };
  }

  @Put(':productCode')
  @Role('admin')
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateProductDto })
  @ApiOperation({ summary: 'Update an existing product (Admin only)' })
  async update(
    @Param('productCode') productCode: string,
    @Body() product: Partial<Product>,
  ): Promise<UpdateProductResponseDto> {
    const updatedProduct = await this.productService.update(
      productCode,
      product,
    );
    return {
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  @Delete(':productCode')
  @Role('admin')
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product (Admin only)' })
  async delete(
    @Param('productCode') productCode: string,
  ): Promise<DeleteProductResponseDto> {
    await this.productService.delete(productCode);
    return {
      success: true,
      message: `Product with ID ${productCode} deleted successfully`,
      data: null,
    };
  }
}
