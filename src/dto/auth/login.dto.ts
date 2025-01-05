import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The username of the user.',
    example: 'john_doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The role of the user, either "admin" or "user".',
    enum: ['admin', 'user'],
  })
  @IsString()
  role: 'admin' | 'user'; // This is a simple role, could be extended
}
