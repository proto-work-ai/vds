import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../middlewares/auth.guard';
import { CreateRoleDto } from './dto/create.dto';
import { UserService } from '../user/user.service';

describe('RoleController', () => {
  let roleController: RoleController;
  let roleService: RoleService;
  let authService: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: {
            getAll: jest.fn(),
            create: jest.fn(),
            getRoleById: jest.fn(),
            deleteById: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();
    roleController = module.get<RoleController>(RoleController);
    roleService = module.get<RoleService>(RoleService);
    authService = module.get<AuthService>(AuthService);
  });
  describe('getAll', () => {
    it('should return an array of roles', async () => {
      const result = [
        { id: 1, name: 'BOSS' },
        { id: 2, name: 'CEO' },
        { id: 3, name: 'SALESMAN' },
      ];

      jest.spyOn(roleService, 'getAll').mockResolvedValue(result);

      expect(await roleController.getAll()).toEqual(result);
      expect(roleService.getAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a Role', async () => {
      const createDto: CreateRoleDto = { name: 'Viewer' };
      const result = { id: 3, ...createDto };
      jest.spyOn(roleService, 'create').mockImplementation(async () => result);
      expect(await roleController.create(CreateRoleDto)).toBe(result);
    });
  });
  describe('getRoleById', () => {
    it('should return a Role by Id', async () => {
      const roleId = '1';
      const mockRole = { id: roleId, name: 'CEO' };

      jest.spyOn(roleService, 'getRoleById').mockResolvedValue(mockRole);

      const result = await roleController.getRoleById(roleId);

      expect(result).toEqual({ id: roleId, name: 'CEO' });
    });
  });

  describe('deleteById', () => {
    it('should delete a role', async () => {
      const roleId = '1';

      jest.spyOn(roleService, 'deleteById').mockResolvedValue(undefined);

      await roleController.deleteById(roleId);

      expect(roleService.deleteById).toHaveBeenCalledWith(roleId);
    });
  });
});
