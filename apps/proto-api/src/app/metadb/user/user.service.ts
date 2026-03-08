/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@metadb/prisma';
import { ATTRIBUTE_STRING, IUser } from '@metadb/model';

import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { RecordService } from '../record/record.service';

export interface UserWithRoles extends CreateUserDto {
  id: string;
  email: string;
  username: string;
  password: string;
  roles: { id: string; name: string }[];
}

@Injectable()
export class UserService {
  private get delegate() {
    return this.prisma.metaRecord;
  }
  constructor(
    private prisma: PrismaService,
    private recordService: RecordService
  ) {}

  async getAll() {
    // const users = await this.recordService.getAll('USER');
  }

  async getById(id: string): Promise<UserDto | null> {
    const user: IUser = await this.recordService.getById(id);

    if (!user) {
      return null;
    }

    return new UserDto({
      id: user.id,
      username: user.username,
      email: user.email
    });
  }

  async create(user: IUser) {
    return await this.recordService.create('USER', user);
  }

  async update(id: string, user: UpdateUserDto) {
    return await this.recordService.update(id, user);
  }

  async deleteById(id: string): Promise<IUser> {
    return await this.recordService.deleteById(id);
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return await this.recordService.find('USER', {
      filters: [
        {
          field: { name: 'username', type: ATTRIBUTE_STRING },
          value: username
        }
      ]
    });
  }

  async validateUser(
    name: string,
    password: string
  ): Promise<UserWithRoles | null> {
    const user = await this.findByUsername(name);
    if (user?.password === password) {
      return user as UserWithRoles;
    }
    return null;
  }

  async getUserWithRoles(userId: string): Promise<UserWithRoles> {
    // const user = await this.delegate.findUnique({
    //   where: { id: userId }
    //     include: {
    //       roles: {
    //         select: {
    //           role: {
    //             select: {
    //               id: true,
    //               name: true
    //             }
    //           }
    //         }
    //       }
    //     }
    // });

    // if (!user) {
    //   throw new Error('User not found');
    // }

    // return {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   password: user.password
    //      roles: user.roles.map((userRole) => ({
    //        id: userRole.role.id,
    //        name: userRole.role.name
    //      }))
    // };
    return null;
  }
}
