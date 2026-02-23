import { Injectable } from "@nestjs/common";
import { CreateUserPermissionDto } from "./dto/create.userPermission.dto";
import { UpdateUserPermissionDto } from "./dto/update.userPermission.dto";

type UserPermission = any;

@Injectable()
export class UserPermissionService {
    constructor(private prisma: any) { }

    async getAllUsersPermission(): Promise<UserPermission[]> {
        return this.prisma.userPermission.findMany();
    }

    async getUserPermissionById(userId: string, permissionId: string): Promise<UserPermission | null> {
        try {
            const userPermission = await this.prisma.userPermission.findUnique({
                where: {
                    userId_permissionId: {
                        userId,
                        permissionId,
                    },
                },
            });
            return userPermission;
        } catch (error) {
            console.error("Error fetching UserPermission:", error);
            throw error;
        }
    }

    async createUserPermission(data: CreateUserPermissionDto): Promise<UserPermission> {
        return this.prisma.userPermission.create({
            data: {
                user: {
                    connect: { id: data.userId },
                },
                permission: {
                    connect: { id: data.permissionId },
                },
            },
        });
    }

    async updateUserPermission(userId: string, permissionId: string, data: UpdateUserPermissionDto): Promise<UserPermission> {
        return this.prisma.userPermission.update({
            where: {
                userId_permissionId: {
                    userId,
                    permissionId,
                },
            },
            data,
        });
    }

    async deleteUserPermissionById(userId: string, permissionId: string): Promise<UserPermission> {
        return this.prisma.userPermission.delete({
            where: {
                userId_permissionId: {
                    userId,
                    permissionId,
                },
            },
        });
    }
}