import { Test, TestingModule } from '@nestjs/testing';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../middlewares/auth.guard'; 
import { CreatePermissionDto } from './dto/create.permission.dto';
import { UserService } from '../user/user.service';

describe('PermissionController', () => {
    let permissionController: PermissionController;
    let permissionService: PermissionService;
    let authService: AuthService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PermissionController],
            providers: [
                {
                    provide: PermissionService,
                    useValue: {
                        getAllPermissions: jest.fn(),
                        createPermission: jest.fn(),
                        getPermissionById: jest.fn(),
                        deletePermissionById: jest.fn(),
                        updatePermission: jest.fn(),
                    },
                },
                {
                    provide: UserService, 
                    useValue: {
                        findUserById: jest.fn(),
                    },
                },
                {
                    provide: AuthGuard,
                    useValue: {
                        canActivate: jest.fn().mockReturnValue(true),
                    },
                },
                {
                    provide: AuthService,
                    useValue: {
                        
                        validateUser: jest.fn(),
                        
                    },
                },
                
            ],
        }).compile();
        permissionController = module.get<PermissionController>(PermissionController);
        permissionService = module.get<PermissionService>(PermissionService);
        authService = module.get<AuthService>(AuthService);
    });
    describe('getAllPermissions', () => {
        it('should return an array of permissions', async () => {
            const result = [
                { id: 1, name: "READ-WRITE" },
                { id: 2, name: "READ" },
                { id: 3, name: "WRITE" },
            ];

            jest.spyOn(permissionService, 'getAllPermissions').mockResolvedValue(result);

            expect(await permissionController.getAllPermissions()).toEqual(result);
            expect(permissionService.getAllPermissions).toHaveBeenCalled();
        });
    });

    describe('createPermission', () => {
        it('should create a Permission', async () => {
            const createPermissionDto: CreatePermissionDto = { name: 'Viewer'};
            const result = { id: 3, ...createPermissionDto };
            jest.spyOn(permissionService, 'createPermission').mockImplementation(async () => result);
            expect(await permissionController.createPermission(CreatePermissionDto)).toBe(result);
        });
    });
    describe('getPermissionById', () => {
        it('should return a Permission by Id', async () => {
            const permissionId = 1;
            const mockPermission = { id: permissionId, name: 'READ-WRITE'};

            jest.spyOn(permissionService, 'getPermissionById').mockResolvedValue(mockPermission);

            const result = await permissionController.getPermissionById(permissionId);

            expect(result).toEqual({ id: permissionId, name: 'READ-WRITE'});
        });
    });

    describe('deletePermissionById', () => {
        it('should delete a permission', async () => {
            const permissionId = 1;

            jest.spyOn(permissionService, 'deletePermissionById').mockResolvedValue(undefined);

            await permissionController.deletePermissionById(permissionId);

            expect(permissionService.deletePermissionById).toHaveBeenCalledWith(permissionId);
        });
    });
});
