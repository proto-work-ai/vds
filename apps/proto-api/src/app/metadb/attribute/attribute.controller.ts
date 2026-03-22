/* eslint-disable @nx/enforce-module-boundaries */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EntityType } from '@metadb/core';

import { CreateAttributeDto, UpdateAttributeDto } from './dto';
import { AttributeSevice } from './attribute.service';
import { AuthGuard } from '../middlewares/auth.guard';

@ApiTags('Attribute')
@Controller('attribute')
// @ApiBearerAuth()
export class AttributeController {
  constructor(private readonly attributeSevice: AttributeSevice) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all entities' })
  async getAll(@Query('limit') limit: number, @Query('currentPage') page: number) {
    return this.attributeSevice.getAll({ limit: Number(limit ?? 10), page: Number(page ?? 1) });
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a attribute by ID' })
  async getById(@Param('id') id: string) {
    return this.attributeSevice.getById(id);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Delete a attribute by ID' })
  async deleteById(@Param('id') id: string) {
    return this.attributeSevice.deleteById(id);
  }

  @Post()
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Create a new attribute' })
  async create(@Body() data: CreateAttributeDto) {
    return this.attributeSevice.create(data);
  }

  @Put(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a attribute by ID' })
  async update(@Param('id') id: string, @Body() data: UpdateAttributeDto) {
    return this.attributeSevice.update(id, data);
  }

  @Get('entity/:entityId')
  @ApiResponse({ status: 200, description: 'Get a attributes by parent' })
  async getByParent(@Param('entityId') entityId: string) {
    return this.attributeSevice.getByEntity(entityId);
  }

  @Get('type/:type')
  @ApiResponse({
    status: 200,
    description: 'Get entries by Parent and Sorting'
  })
  async getByType(@Param('type') type: EntityType) {
    return this.attributeSevice.getByType(type);
  }
}
