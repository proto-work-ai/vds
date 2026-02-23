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
import { EntryService } from './record.service';
import { EntityType, IRecord } from '@metadb/model';

@ApiTags('Entries')
@Controller('entry')
@ApiBearerAuth()
export class EntryController {
  constructor(private readonly entityService: EntryService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all entries' })
  async getAll() {
    return this.entityService.getAll(null);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a entry by ID' })
  async getRoleById(@Param('id') id: string) {
    return this.entityService.getById(id);
  }

  @Post(':entityId')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Create or update entry by ENTITY' })
  async create(
    @Param('entityId') entityId: string,
    @Body() data: IRecord | IRecord[]
  ) {
    if (Array.isArray(data)) {
      return this.entityService.createMany(entityId, data);
    } else {
      return this.entityService.create(entityId, data);
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
      return this.entityService.updateMany(recordId, data);
    } else {
      return this.entityService.update(recordId, data);
    }
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
  async patch(@Param('id') id: string, @Body() data: any) {
    return this.entityService.update(id, data);
  }

  @Get('by-entity/:id')
  @ApiResponse({
    status: 200,
    description: 'Get entries by Parent and Sorting'
  })
  async getManyByEntity(
    @Param('id') id: string,
    @Query('filter') filter: string
  ) {
    let search = {};
    try {
      search = JSON.parse(filter as string);
    } catch (e) {}
    return this.entityService.getManyByEntity(id, search);
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
    return this.entityService.getManyByType(type, search);
  }
}
