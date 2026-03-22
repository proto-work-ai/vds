/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-empty */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
  Query
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '../middlewares/auth.guard';
import { RecordService } from './record.service';
import { EntityType, IRecord } from '@metadb/core';

@ApiTags('Entries')
@Controller('record')
@ApiBearerAuth()
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all entities' })
  async getAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.recordService.getAll({ limit: Number(limit ?? 10), page: Number(page ?? 1) });
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a entry by ID' })
  async getRoleById(@Param('id') id: string) {
    return this.recordService.getById(id);
  }

  @Post(':entityId')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Create or update entry by ENTITY' })
  async create(
    @Param('entityId') entityId: string,
    @Body() data: IRecord | IRecord[]
  ) {
    if (Array.isArray(data)) {
      return this.recordService.createMany(entityId, data);
    } else {
      return this.recordService.create(entityId, data);
    }
  }

  @Put(':recordId')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a entry by ENTITY' })
  async update(
    @Param('recordId') recordId: string,
    @Body() data: IRecord | IRecord[]
  ) {
    if (Array.isArray(data)) {
      return this.recordService.updateMany(recordId, data);
    } else {
      return this.recordService.update(recordId, data);
    }
  }

  @Delete(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Delete a entity by ID' })
  async deleteById(@Param('id') id: string) {
    return this.recordService.deleteById(id);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a entity by ID' })
  async patch(@Param('id') id: string, @Body() data: any) {
    return this.recordService.update(id, data);
  }

  @Get('by-entity/:entityId')
  @ApiResponse({
    status: 200,
    description: 'Get entries by Parent and Sorting'
  })
  async getManyByEntity(
    @Param('entityId') entityId: string,
    @Query('filter') filter: string
  ) {
    let search = {};
    try {
      search = JSON.parse(filter as string);
    } catch (e) {}
    return this.recordService.getAllByEntity(entityId, search);
  }

  @Get('by-type/:type')
  @ApiResponse({
    status: 200,
    description: 'Get entries by Type Parent and Sorting'
  })
  async getManyByType(
    @Param('type') type: EntityType,
    @Query('filter') filter: string
  ) {
    let search = {};
    try {
      search = JSON.parse(filter as string);
    } catch (e) {}
    return this.recordService.getAllByType(type, search);
  }
}
