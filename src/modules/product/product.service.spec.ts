import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { Product } from '../../entity/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: jest.Mocked<Partial<Repository<Product>>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products matching query', async () => {
      const mockProducts = [
        {
          id: 1,
          productDescription: 'Sedan',
          productCode: 'P001',
          location: 'West Malaysia',
          price: 300,
        },
        {
          id: 2,
          productDescription: 'Sedan',
          productCode: 'P001',
          location: 'East Malaysia',
          price: 400,
        },
      ];

      productRepository.find.mockResolvedValue(mockProducts);

      const result = await productService.findAll({ location: 'NYC' });
      expect(productRepository.find).toHaveBeenCalledWith({
        where: { location: 'NYC' },
      });
      expect(result).toEqual(mockProducts);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      const newProduct = {
        id: 1,
        productDescription: 'Sedan',
        productCode: 'DEF789',
        location: 'West Malaysia',
        price: 300,
      };
      productRepository.findOne.mockResolvedValue(null); // No product exists with the same code
      productRepository.create.mockReturnValue(newProduct);
      productRepository.save.mockResolvedValue(newProduct);

      const result = await productService.create(newProduct);
      expect(productRepository.findOne).toHaveBeenCalledWith({
        where: { productCode: 'DEF789' },
      });
      expect(productRepository.create).toHaveBeenCalledWith(newProduct);
      expect(productRepository.save).toHaveBeenCalledWith(newProduct);
      expect(result).toEqual(newProduct);
    });

    it('should throw BadRequestException if product code exists', async () => {
      const mockProduct: Product = {
        id: 1,
        productCode: 'DEF789',
        productDescription: 'Sample Product',
        location: 'LA',
        price: 100,
      };

      productRepository.findOne.mockResolvedValue(mockProduct);

      await expect(
        productService.create({ productCode: 'DEF789', location: 'LA' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const existingProduct = {
        id: 1,
        productCode: 'DEF789',
        productDescription: 'Sample Product',
        location: 'LA',
        price: 100,
      };
      const updatedData = { location: 'LA', price: 120 };

      productRepository.findOne.mockResolvedValue(existingProduct);
      productRepository.save.mockResolvedValue({
        ...existingProduct,
        ...updatedData,
      });

      const result = await productService.update('ABC123', updatedData);
      expect(productRepository.findOne).toHaveBeenCalledWith({
        where: { productCode: 'ABC123' },
      });
      expect(productRepository.save).toHaveBeenCalledWith({
        ...existingProduct,
        ...updatedData,
      });
      expect(result).toEqual({ ...existingProduct, ...updatedData });
    });

    it('should throw NotFoundException if product not found', async () => {
      productRepository.findOne.mockResolvedValue(null);

      await expect(
        productService.update('NONEXISTENT', { location: 'LA' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const existingProduct = {
        id: 1,
        productCode: 'DEF789',
        productDescription: 'Sample Product',
        location: 'LA',
        price: 100,
      };

      productRepository.findOne.mockResolvedValue(existingProduct);
      productRepository.delete.mockResolvedValue(undefined);

      await productService.delete('ABC123');
      expect(productRepository.findOne).toHaveBeenCalledWith({
        where: { productCode: 'ABC123' },
      });
      expect(productRepository.delete).toHaveBeenCalledWith({
        productCode: 'ABC123',
      });
    });

    it('should throw NotFoundException if product not found', async () => {
      productRepository.findOne.mockResolvedValue(null);

      await expect(productService.delete('NONEXISTENT')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
