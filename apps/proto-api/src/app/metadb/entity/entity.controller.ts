/* eslint-disable @nx/enforce-module-boundaries */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { EntityType } from '@metadb/core';
import { MetaEntity } from '@metadb/client';
import { MetaEntityService } from './entity.service';

@ApiTags('Entities')
@Controller('entity')
// @ApiBearerAuth()
export class EntityController {
  constructor(private readonly entityService: MetaEntityService) { }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a entity by ID' })
  async getById(@Param('id') id: string) {
    return this.entityService.getById(id);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all entities' })
  async getAll(@Query('length') length: number, @Query('currentPage') page: number) {
    return this.entityService.getAll({ limit: Number(length ?? 10), page: Number(page ?? 0) });
  }

  @Get('by-type/:type')
  @ApiResponse({
    status: 200,
    description: 'Get a entity by TYPE'
  })
  async getByType(@Param('type') type: EntityType) {
    return this.entityService.getByType(type);
  }

  @Post()
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Create a new entity' })
  async create(@Body() data: MetaEntity) {
    return this.entityService.create(data);
  }

  @Put(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a entity by ID' })
  async update(@Param('id') id: string, @Body() data: MetaEntity) {
    return this.entityService.update(id, data);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Delete a entity by ID' })
  async deleteById(@Param('id') id: string) {
    return this.entityService.deleteById(id);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a entity by ID' })
  async patch(@Param('id') id: string, @Body() data: MetaEntity) {
    return this.entityService.update(id, data);
  }
}
