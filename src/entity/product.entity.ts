import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 10, name: 'product_code' })
  productCode: string;

  @Column({ type: 'varchar', length: 255, name: 'product_description' })
  productDescription: string;

  @Column({ type: 'varchar', length: 100, name: 'location' })
  location: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'price' })
  price: number;
}
