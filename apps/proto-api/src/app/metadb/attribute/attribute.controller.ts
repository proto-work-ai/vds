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
import { EntityType } from '@metadb/model';

import { CreateAttributeDto, UpdateAttributeDto } from './dto';
import { AttributeSevice } from './attribute.service';
import { AuthGuard } from '../middlewares/auth.guard';

@ApiTags('Attribute')
@Controller('attribute')
// @ApiBearerAuth()
export class AttributeController {
  constructor(private readonly attributeSevice: AttributeSevice) {
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all attributes' })
  async getAll2() {
    return this.attributeSevice.getAll();
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all entities' })
  async getAll(@Query('length') length: number, @Query('currentPage') page: number) {
    return this.attributeSevice.getAll({ limit: Number(length ?? 10), page: Number(page ?? 0) });
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

  @Post(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Create a new attribute' })
  async create(@Param('id') id: string, @Body() data: CreateAttributeDto) {
    return this.attributeSevice.create(id, data);
  }

  @Put(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a attribute by ID' })
  async update(@Param('id') id: string, @Body() data: UpdateAttributeDto) {
    return this.attributeSevice.update(id, data);
  }

  @Get('by-entity/:id')
  @ApiResponse({ status: 200, description: 'Get a attributes by parent' })
  async getByParent(@Param('id') id: string) {
    return this.attributeSevice.getByEntity(id);
  }

  @Get('by-type/:type')
  @ApiResponse({
    status: 200,
    description: 'Get entries by Parent and Sorting'
  })
  async getByType(@Param('type') type: EntityType) {
    return this.attributeSevice.getByType(type);
  }
}
