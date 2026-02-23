import { Test, TestingModule } from '@nestjs/testing';
import { RolePermissionController } from './role.permission.controller';
import { RolePermissionService } from './role.permission.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../middlewares/auth.guard';
import { CreateRolePermissionDto } from './dto/create.rolePermission.dto';

describe('RolePermissionController', () => {
    let rolePermissionController: RolePermissionController;
    let rolePermissionService: RolePermissionService;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RolePermissionController],
            providers: [
                {
                    provide: RolePermissionService,
                    useValue: {
                        getAllRolePermission: jest.fn(),
                        createRolePermission: jest.fn(),
                        getRolePermissionById: jest.fn(),
                        deleteRolePermissionById: jest.fn(),
                        updateRolePermission: jest.fn(),
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

        rolePermissionController = module.get<RolePermissionController>(RolePermissionController);
        rolePermissionService = module.get<RolePermissionService>(RolePermissionService);
        authService = module.get<AuthService>(AuthService);
    });

    describe('getAllRolePermissions', () => {
        it('should return an array of roles permisisons', async () => {
            const result = [
                { roleId: 1, permissionId: 2 },
                { roleId: 1, permissionId: 3 },
                { roleId: 3, permissionId: 2 },
            ];

            jest.spyOn(rolePermissionService, 'getAllRolePermission').mockResolvedValue(result);

            expect(await rolePermissionController.getAllRolesPermission()).toEqual(result);
            expect(rolePermissionService.getAllRolePermission).toHaveBeenCalled();
        });
    });

    describe('createRolePermission', () => {
        it('should create a role permission', async () => {
            const createRolePermissionDto: CreateRolePermissionDto = { roleId: 2, permissionId: 2 };
            const result = { id: 2, ...createRolePermissionDto };

            jest.spyOn(rolePermissionService, 'createRolePermission').mockResolvedValue(result);

            expect(await rolePermissionController.createRolePermission(createRolePermissionDto)).toBe(result);
            expect(rolePermissionService.createRolePermission).toHaveBeenCalledWith(createRolePermissionDto);
        });

        it('should handle errors during role permission creation', async () => {
            const createRolePermissionDto: CreateRolePermissionDto = { roleId: 2, permissionId: 2 };
            const errorMessage = 'Error creating role permission';

            jest.spyOn(rolePermissionService, 'createRolePermission').mockRejectedValue(new Error(errorMessage));

            await expect(rolePermissionController.createRolePermission(createRolePermissionDto)).rejects.toThrow(errorMessage);
        });
    });

    describe('getRolePermissionById', () => {
        it('should return a role permissions by roleId and permissionId', async () => {
            const roleId = 2;
            const permissionId = 3;
            const mockRolePermission = { roleId, permissionId };

            jest.spyOn(rolePermissionService, 'getRolePermissionById').mockResolvedValue(mockRolePermission);

            const result = await rolePermissionController.getRolePermissionById(roleId, permissionId);

            expect(result).toEqual(mockRolePermission);
            expect(rolePermissionService.getRolePermissionById).toHaveBeenCalledWith(roleId, permissionId);
        });

        it('should return null if no roleId and permissionId found', async () => {
            const roleId = 2;
            const permissionId = 3;

            jest.spyOn(rolePermissionService, 'getRolePermissionById').mockResolvedValue(null);

            const result = await rolePermissionController.getRolePermissionById(roleId, permissionId);

            expect(result).toBeNull();
            expect(rolePermissionService.getRolePermissionById).toHaveBeenCalledWith(roleId, permissionId);
        });
    });

    describe('deleteRolePermissionById', () => {
        it('should delete a role permission', async () => {
            const roleId = 2;
            const permissionId = 2;

            jest.spyOn(rolePermissionService, 'deleteRolePermissionById').mockResolvedValue(undefined);

            await rolePermissionController.deleteRolePermissionById(roleId, permissionId);

            expect(rolePermissionService.deleteRolePermissionById).toHaveBeenCalledWith(roleId, permissionId);
        });

        it('should handle errors during role permission deletion', async () => {
            const roleId = 1;
            const permissionId = 2;
            const errorMessage = 'Error deleting role permission';

            jest.spyOn(rolePermissionService, 'deleteRolePermissionById').mockRejectedValue(new Error(errorMessage));

            await expect(rolePermissionController.deleteRolePermissionById(roleId, permissionId)).rejects.toThrow(errorMessage);
        });
    });

    describe('updateRolePermission', () => {
        it('should update a role permission', async () => {
            const roleId = 1;
            const permissionId = 2;
            const updatedData = { permissionId: 3 };
            const result = { roleId, permissionId: updatedData.permissionId };
    
            jest.spyOn(rolePermissionService, 'updateRolePermission').mockResolvedValue(result);
    
            const response = await rolePermissionController.updateRolePermission(roleId, permissionId, updatedData);
    
            expect(response).toEqual(result);
            expect(rolePermissionService.updateRolePermission).toHaveBeenCalledWith(roleId, permissionId, updatedData);
        });
    
        it('should handle errors during role permission update', async () => {
            const roleId = 1;
            const permissionId = 2;
            const updatedData = { permissionId: 3 };
            const errorMessage = 'Error updating role permission';
    
            jest.spyOn(rolePermissionService, 'updateRolePermission').mockRejectedValue(new Error(errorMessage));
    
            await expect(rolePermissionController.updateRolePermission(roleId, permissionId, updatedData)).rejects.toThrow(errorMessage);
        });
    });
    
});
