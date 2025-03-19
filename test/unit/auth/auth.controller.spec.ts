import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { LocalAuthGuard } from '../../../src/auth/guards/local-auth.guard';
import { LocalStrategy } from '../../../src/auth/strategies/local.strategy';
import { ExecutionContext } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      controllers: [AuthController],
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            login: jest
              .fn()
              .mockResolvedValue({ accessToken: 'mocked-jwt-token' }),
            validateUser: jest
              .fn()
              .mockResolvedValue({ id: 1, email: 'bob@example.com' }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT access token', async () => {
      const mockUser = { id: 1, email: 'bob@example.com' };
      const mockRequest = { user: mockUser };

      const result = await authController.login(mockRequest);
      expect(result).toEqual({ accessToken: 'mocked-jwt-token' });
      expect(authService.login).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('LocalAuthGuard', () => {
    it('should allow a valid user', async () => {
      const guard = new LocalAuthGuard();

      const mockExecutionContext: ExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            body: { email: 'bob@example.com', password: 'password123' },
            user: { id: 1, email: 'bob@example.com' },
          }),
          getResponse: () => ({}),
        }),
      } as unknown as ExecutionContext;

      expect(await guard.canActivate(mockExecutionContext)).toBeTruthy();
    });
  });
});
