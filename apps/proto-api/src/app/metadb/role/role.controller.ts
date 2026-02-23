import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from "../middlewares/auth.guard";
import { CreateRoleDto } from "./dto";
import { UpdateRoleDto } from "./dto";
import { RoleService } from "./role.service";

@ApiTags('Roles')
@Controller('role')
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all roles' })
  async getAll() {
    return this.roleService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Create a new role' })
  async create(@Body() data: CreateRoleDto) {
    return this.roleService.create(data);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a role by ID' })
  async getRoleById(@Param('id') id: string) {
    return this.roleService.getRoleById(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Delete a role by ID' })
  async deleteById(@Param('id') id: string) {
    return this.roleService.deleteById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a role by ID' })
  async update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    return this.roleService.update(id, data);
  }
}
