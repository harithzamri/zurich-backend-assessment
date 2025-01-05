import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindProductDto {
  @ApiPropertyOptional({
    description: 'Filter by product code',
    example: 'P005',
  })
  productCode?: string;

  @ApiPropertyOptional({
    description: 'Filter by location',
    example: 'East Malaysia',
  })
  location?: string;
}
