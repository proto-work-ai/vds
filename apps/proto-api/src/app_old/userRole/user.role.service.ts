import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create.userRole.dto';
import { UpdateUserRoleDto } from './dto/update.userRole.dto';

type UserRole = any;

@Injectable()
export class UserRoleService {
  constructor(private prisma: any) {}

  async getAllUsersRoles(): Promise<UserRole[]> {
    return this.prisma.userRole.findMany();
  }

  async getUserRoleById(
    userId: string,
    roleId: string
  ): Promise<UserRole | null> {
    try {
      const UserRole = await this.prisma.userRole.findUnique({
        where: {
          userId_roleId: {
            userId,
            roleId
          }
        }
      });
      return UserRole;
    } catch (error) {
      console.error('Error fetching User Role: ', error);
      throw error;
    }
  }

  async createUserRole(data: CreateUserRoleDto): Promise<UserRole> {
    return this.prisma.userRole.create({
      data: {
        user: {
          connect: { id: data.userId }
        },
        role: {
          connect: { id: data.roleId }
        }
      }
    });
  }

  async updateUserRole(
    userId: string,
    roleId: string,
    data: UpdateUserRoleDto
  ): Promise<UserRole> {
    return this.prisma.userRole.update({
      where: {
        userId_roleId: {
          userId,
          roleId
        }
      },
      data
    });
  }

  async deleteUserRoleById(userId: string, roleId: string): Promise<UserRole> {
    return this.prisma.userRole.delete({
      where: {
        userId_roleId: {
          userId,
          roleId
        }
      }
    });
  }
}
