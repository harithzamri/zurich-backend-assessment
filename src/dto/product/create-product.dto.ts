import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product Code' })
  @IsNotEmpty()
  @IsString()
  productCode: string;

  @ApiProperty({ description: 'Product Description' })
  @IsNotEmpty()
  @IsString()
  productDescription: string;

  @ApiProperty({ description: 'Location' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ description: 'Price' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
