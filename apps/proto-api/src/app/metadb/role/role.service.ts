/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@metadb/prisma';
import { CreateRoleDto } from './dto/create.dto';
import { UpdateRoleDto } from './dto/update.dto';

type Role = any;

@Injectable()
export class RoleService {
    private get delegate(){
      return this.prisma.metaEntity;
    }

  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Role[]> {
    return this.delegate.findMany();
  }

  async getRoleById(id: string): Promise<Role> {
    return this.delegate.findUnique({
      where: { id }
    });
  }

  async create(data: CreateRoleDto): Promise<Role> {
    return this.delegate.create({
      data: {
        name: data.name
      }
    });
  }

  async update(id: string, data: UpdateRoleDto): Promise<Role> {
    return this.delegate.update({
      where: { id },
      data
    });
  }

  async deleteById(id: string): Promise<Role> {
    return this.delegate.delete({
      where: { id }
    });
  }
}
