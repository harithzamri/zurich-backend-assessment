import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // For TypeORM, adjust if using another ORM
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
