import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleController } from './user.role.controller';
import { UserRoleService } from './user.role.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../middlewares/auth.guard';
import { CreateUserRoleDto } from './dto/create.userRole.dto';

describe('UserRoleController', () => {
    let userRoleController: UserRoleController;
    let userRoleService: UserRoleService;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserRoleController],
            providers: [
                {
                    provide: UserRoleService,
                    useValue: {
                        getAllUsersRoles: jest.fn(),
                        createUserRole: jest.fn(),
                        getUserRoleById: jest.fn(),
                        deleteUserRoleById: jest.fn(),
                        updateUserRole: jest.fn(),
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

        userRoleController = module.get<UserRoleController>(UserRoleController);
        userRoleService = module.get<UserRoleService>(UserRoleService);
        authService = module.get<AuthService>(AuthService);
    });

    describe('getAllUsersRoles', () => {
        it('should return an array of users roles', async () => {
            const result = [
                { userId: 1, roleId: 2 },
                { userId: 1, roleId: 3 },
                { userId: 3, roleId: 2 },
            ];

            jest.spyOn(userRoleService, 'getAllUsersRoles').mockResolvedValue(result);

            expect(await userRoleController.getAllUsersRoles()).toEqual(result);
            expect(userRoleService.getAllUsersRoles).toHaveBeenCalled();
        });
    });

    describe('createUserRole', () => {
        it('should create a user role', async () => {
            const createUserRoleDto: CreateUserRoleDto = { userId: 2, roleId: 2 };
            const result = { id: 2, ...createUserRoleDto };

            jest.spyOn(userRoleService, 'createUserRole').mockResolvedValue(result);

            expect(await userRoleController.createUserRole(createUserRoleDto)).toBe(result);
            expect(userRoleService.createUserRole).toHaveBeenCalledWith(createUserRoleDto);
        });

        it('should handle errors during user role creation', async () => {
            const createUserRoleDto: CreateUserRoleDto = { userId: 2, roleId: 2 };
            const errorMessage = 'Error creating user role';

            jest.spyOn(userRoleService, 'createUserRole').mockRejectedValue(new Error(errorMessage));

            await expect(userRoleController.createUserRole(createUserRoleDto)).rejects.toThrow(errorMessage);
        });
    });

    describe('getUserRoleById', () => {
        it('should return a user role by userId and roleId', async () => {
            const userId = 2;
            const roleId = 3;
            const mockUserRole = { userId, roleId };

            jest.spyOn(userRoleService, 'getUserRoleById').mockResolvedValue(mockUserRole);

            const result = await userRoleController.getUserRoleById(userId, roleId);

            expect(result).toEqual(mockUserRole);
            expect(userRoleService.getUserRoleById).toHaveBeenCalledWith(userId, roleId);
        });

        it('should return null if no user role found', async () => {
            const userId = 2;
            const roleId = 3;

            jest.spyOn(userRoleService, 'getUserRoleById').mockResolvedValue(null);

            const result = await userRoleController.getUserRoleById(userId, roleId);

            expect(result).toBeNull();
            expect(userRoleService.getUserRoleById).toHaveBeenCalledWith(userId, roleId);
        });
    });

    describe('deleteUserRoleById', () => {
        it('should delete a user role', async () => {
            const userId = 1;
            const roleId = 2;

            jest.spyOn(userRoleService, 'deleteUserRoleById').mockResolvedValue(undefined);

            await userRoleController.deleteUserRoleById(userId, roleId);

            expect(userRoleService.deleteUserRoleById).toHaveBeenCalledWith(userId, roleId);
        });

        it('should handle errors during user role deletion', async () => {
            const userId = 1;
            const roleId = 2;
            const errorMessage = 'Error deleting user role';

            jest.spyOn(userRoleService, 'deleteUserRoleById').mockRejectedValue(new Error(errorMessage));

            await expect(userRoleController.deleteUserRoleById(userId, roleId)).rejects.toThrow(errorMessage);
        });
    });

    describe('updateUserRole', () => {
        it('should update a user role', async () => {
            const userId = 1;
            const roleId = 2;
            const updatedData = { roleId: 3 };
            const result = { userId, roleId: updatedData.roleId };
    
            jest.spyOn(userRoleService, 'updateUserRole').mockResolvedValue(result);
    
            
            const response = await userRoleController.updateUserRole(userId, roleId, updatedData);
    
            expect(response).toEqual(result);
            expect(userRoleService.updateUserRole).toHaveBeenCalledWith(userId, roleId, updatedData);
        });
    
        it('should handle errors during user role update', async () => {
            const userId = 1;
            const roleId = 2;
            const updatedData = { roleId: 3 };
            const errorMessage = 'Error updating user role';
    
            jest.spyOn(userRoleService, 'updateUserRole').mockRejectedValue(new Error(errorMessage));
    
            await expect(userRoleController.updateUserRole(userId, roleId, updatedData)).rejects.toThrow(errorMessage);
        });
    });
    
});
