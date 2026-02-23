import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from "../middlewares/auth.guard";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { UserDto } from "./dto/user.dto";

@ApiTags('Users')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users' })
  async getAll() {
    return this.userService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Create a new user' })
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a user by ID' })
  async getById(@Param('id') id: string): Promise<UserDto | null> {
    return this.userService.getById(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Delete a user by ID' })
  async deleteById(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a user by ID' })
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }
}