import { Controller, Get, Delete, Put, Param, Body, Post, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { UserPermissionService } from "./user.permission.service";
import { UpdateUserPermissionDto } from "./dto/update.userPermission.dto";
import { CreateUserPermissionDto } from "./dto/create.userPermission.dto"
import { AuthGuard } from "../middlewares/auth.guard";

@Controller('user-permission')
@ApiBearerAuth()
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users permission' })
  async getAllUsersPermission() {
    return this.userPermissionService.getAllUsersPermission();
  }

  @Get(':userId/:permissionId')
  @ApiResponse({ status: 200, description: 'Get a user permission by User ID and Permission ID' })
  async getUserPermissionById(
    @Param('userId', ParseIntPipe) userId: string,
    @Param('permissionId', ParseIntPipe) permissionId: string
  ) {
    return this.userPermissionService.getUserPermissionById(userId, permissionId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Create a new user-permission' })
  async createUserPermission(@Body() data: CreateUserPermissionDto) {
    return this.userPermissionService.createUserPermission(data);
  }

  @Delete(':userId/:permissionId')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Delete a user permission by User ID and Permission ID' })
  async deleteUserPermissionById(
    @Param('userId', ParseIntPipe) userId: string,
    @Param('permissionId', ParseIntPipe) permissionId: string
  ) {
    return this.userPermissionService.deleteUserPermissionById(userId, permissionId);
  }

  @Put(':userId/:permissionId')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a user permission by User ID and Permission ID' })
  async updateUserPermission(
    @Param('userId', ParseIntPipe) userId: string,
    @Param('permissionId', ParseIntPipe) permissionId: string,
    @Body() data: UpdateUserPermissionDto
  ) {
    return this.userPermissionService.updateUserPermission(userId, permissionId, data);
  }
}
