import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { CreatePermissionDto } from "./dto/create.permission.dto";
import { UpdatePermissionDto } from "./dto/update.permission.dto";
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from "../middlewares/auth.guard";


@ApiTags('Permissions')
@Controller('permission')
@ApiBearerAuth()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all permissions' })
  async getAllPermissions() {
    return this.permissionService.getAllPermissions();
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Create a new Permission' })
  async createPermission(@Body() data: CreatePermissionDto) {
    return this.permissionService.createPermission(data);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a permission by ID' })
  async getPermissionById(@Param('id') id: string) {
    return this.permissionService.getPermissionById(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Delete a permission by ID' })
  async deletePermissionById(@Param('id') id: string) {
    return this.permissionService.deletePermissionById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a permission by ID' })
  async updatePermission(@Param('id') id: string, @Body() data: UpdatePermissionDto) {
    return this.permissionService.updatePermission(id, data);
  }
}
