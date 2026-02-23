import { Test, TestingModule } from '@nestjs/testing';
import { UserPermissionController } from './user.permission.controller';
import { UserPermissionService } from './user.permission.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../middlewares/auth.guard';
import { CreateUserPermissionDto } from './dto/create.userPermission.dto';

describe('UserPermissionController', () => {
    let userPermissionController: UserPermissionController;
    let userPermissionService: UserPermissionService;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserPermissionController],
            providers: [
                {
                    provide: UserPermissionService,
                    useValue: {
                        getAllUsersPermission: jest.fn(),
                        createUserPermission: jest.fn(),
                        getUserPermissionById: jest.fn(),
                        deleteUserPermissionById: jest.fn(),
                        updateUserPermission: jest.fn(),
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

        userPermissionController = module.get<UserPermissionController>(UserPermissionController);
        userPermissionService = module.get<UserPermissionService>(UserPermissionService);
        authService = module.get<AuthService>(AuthService);
    });

    describe('getAllUsersPermissions', () => {
        it('should return an array of users permisisons', async () => {
            const result = [
                { userId: 1, permissionId: 2 },
                { userId: 1, permissionId: 3 },
                { userId: 3, permissionId: 2 },
            ];

            jest.spyOn(userPermissionService, 'getAllUsersPermission').mockResolvedValue(result);

            expect(await userPermissionController.getAllUsersPermission()).toEqual(result);
            expect(userPermissionService.getAllUsersPermission).toHaveBeenCalled();
        });
    });

    describe('createUserPermission', () => {
        it('should create a user permission', async () => {
            const createUserPermissionDto: CreateUserPermissionDto = { userId: 2, permissionId: 2 };
            const result = { id: 2, ...createUserPermissionDto };

            jest.spyOn(userPermissionService, 'createUserPermission').mockResolvedValue(result);

            expect(await userPermissionController.createUserPermission(createUserPermissionDto)).toBe(result);
            expect(userPermissionService.createUserPermission).toHaveBeenCalledWith(createUserPermissionDto);
        });

        it('should handle errors during user permission creation', async () => {
            const createUserPermissionDto: CreateUserPermissionDto = { userId: 2, permissionId: 2 };
            const errorMessage = 'Error creating user permission';

            jest.spyOn(userPermissionService, 'createUserPermission').mockRejectedValue(new Error(errorMessage));

            await expect(userPermissionController.createUserPermission(createUserPermissionDto)).rejects.toThrow(errorMessage);
        });
    });

    describe('getUserPermissionById', () => {
        it('should return a user permissions by userId and permissionId', async () => {
            const userId = 2;
            const permissionId = 3;
            const mockUserPermission = { userId, permissionId };

            jest.spyOn(userPermissionService, 'getUserPermissionById').mockResolvedValue(mockUserPermission);

            const result = await userPermissionController.getUserPermissionById(userId, permissionId);

            expect(result).toEqual(mockUserPermission);
            expect(userPermissionService.getUserPermissionById).toHaveBeenCalledWith(userId, permissionId);
        });

        it('should return null if no user permission found', async () => {
            const userId = 2;
            const permissionId = 3;

            jest.spyOn(userPermissionService, 'getUserPermissionById').mockResolvedValue(null);

            const result = await userPermissionController.getUserPermissionById(userId, permissionId);

            expect(result).toBeNull();
            expect(userPermissionService.getUserPermissionById).toHaveBeenCalledWith(userId, permissionId);
        });
    });

    describe('deleteUserPermissionById', () => {
        it('should delete a user permission', async () => {
            const userId = 1;
            const permissionId = 2;

            jest.spyOn(userPermissionService, 'deleteUserPermissionById').mockResolvedValue(undefined);

            await userPermissionController.deleteUserPermissionById(userId, permissionId);

            expect(userPermissionService.deleteUserPermissionById).toHaveBeenCalledWith(userId, permissionId);
        });

        it('should handle errors during user permission deletion', async () => {
            const userId = 1;
            const permissionId = 2;
            const errorMessage = 'Error deleting user permission';

            jest.spyOn(userPermissionService, 'deleteUserPermissionById').mockRejectedValue(new Error(errorMessage));

            await expect(userPermissionController.deleteUserPermissionById(userId, permissionId)).rejects.toThrow(errorMessage);
        });
    });

    describe('updateUserPermission', () => {
        it('should update a user permission', async () => {
            const userId = 1;
            const permissionId = 2;
            const updatedData = { permissionId: 3 };
            const result = { userId, permissionId: updatedData.permissionId };
    
            jest.spyOn(userPermissionService, 'updateUserPermission').mockResolvedValue(result);
    
            const response = await userPermissionController.updateUserPermission(userId, permissionId, updatedData);
    
            expect(response).toEqual(result);
            expect(userPermissionService.updateUserPermission).toHaveBeenCalledWith(userId, permissionId, updatedData);
        });
    
        it('should handle errors during user permission update', async () => {
            const userId = 1;
            const permissionId = 2;
            const updatedData = { permissionId: 3 };
            const errorMessage = 'Error updating user permission';
    
            jest.spyOn(userPermissionService, 'updateUserPermission').mockRejectedValue(new Error(errorMessage));
    
            await expect(userPermissionController.updateUserPermission(userId, permissionId, updatedData)).rejects.toThrow(errorMessage);
        });
    });
    
});
