import { Product } from '../../entity/product.entity';
import { ApiResponse } from '../api-response.dto';

export class FindProductsResponseDto extends ApiResponse<Product[]> {}
export class CreateProductResponseDto extends ApiResponse<Product> {}
export class UpdateProductResponseDto extends ApiResponse<Product> {}
export class DeleteProductResponseDto extends ApiResponse<null> {}
