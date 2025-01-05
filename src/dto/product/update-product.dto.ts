import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ description: 'Location' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ description: 'Price' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
