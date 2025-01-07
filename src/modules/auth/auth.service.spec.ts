import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from '../../dto/auth/login.dto';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userService: jest.Mocked<UserService>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    configService = module.get(ConfigService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return a token when the user is found', async () => {
      const loginDto: LoginDto = { username: 'testuser', role: 'admin' };
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'hashedpassword',
        email: 'test@example.com',
      };

      userService.findByUsername.mockResolvedValue(mockUser);
      configService.get.mockReturnValue('test-jwt-secret');

      // Mock the jwt.sign function to return 'mockToken'
      (jwt.sign as jest.Mock).mockReturnValue('mockToken');

      const result = await authService.login(loginDto);

      expect(userService.findByUsername).toHaveBeenCalledWith('testuser');
      expect(configService.get).toHaveBeenCalledWith('JWT_SECRET');
      expect(jwt.sign).toHaveBeenCalledWith(
        { username: 'testuser', role: 'admin' },
        'test-jwt-secret',
        { expiresIn: '1h' },
      );
      expect(result).toEqual({ token: 'mockToken' });
    });

    it('should throw an error if the user is not found', async () => {
      const loginDto: LoginDto = { username: 'nonexistentuser', role: 'user' };

      userService.findByUsername.mockResolvedValue(undefined);

      await expect(authService.login(loginDto)).rejects.toThrowError(
        'Invalid username or password',
      );
    });
  });
});
