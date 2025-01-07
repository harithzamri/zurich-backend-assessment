import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<Partial<Repository<User>>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findByUsername', () => {
    it('should return a user when found', async () => {
      const mockUser: User = {
        id: 1,
        username: 'testuser',
        password: 'password',
        email: 'testuser@gmail.com',
      };

      userRepository.findOne.mockResolvedValue(mockUser);

      const result = await userService.findByUsername('testuser');
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
      expect(result).toEqual(mockUser);
    });

    it('should return undefined when user not found', async () => {
      userRepository.findOne.mockResolvedValue(undefined);

      const result = await userService.findByUsername('nonexistentuser');
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'nonexistentuser' },
      });
      expect(result).toBeUndefined();
    });
  });
});
