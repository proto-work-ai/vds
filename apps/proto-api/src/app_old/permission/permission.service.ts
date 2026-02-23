import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create.permission.dto';
import { UpdatePermissionDto } from './dto/update.permission.dto';

type Permission = any;
type Prisma = any;

@Injectable()
export class PermissionService {
  constructor(private prisma: any) {}

  async getAllPermissions(): Promise<Permission[]> {
    return this.prisma.permission.findMany();
  }

  async getPermissionById(id: string): Promise<Permission> {
    return this.prisma.permission.findUnique({
      where: { id }
    });
  }

  async createPermission(data: CreatePermissionDto): Promise<Permission> {
    const permissionData: any = {
      name: data.name
    };

    return this.prisma.permission.create({
      data: permissionData
    });
  }

  async updatePermission(
    id: string,
    data: UpdatePermissionDto
  ): Promise<Permission> {
    return this.prisma.permission.update({
      where: { id },
      data
    });
  }

  async deletePermissionById(id: string): Promise<Permission> {
    return this.prisma.permission.delete({
      where: { id }
    });
  }
}
