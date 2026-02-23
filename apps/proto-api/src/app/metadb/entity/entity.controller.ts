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
  Patch
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EntityType } from '@metadb/model';

import { AuthGuard } from '../middlewares/auth.guard';
import { MetaEntityService } from './entity.service';
import { CreateEntityDto, UpdateEntityDto } from './dto';

@ApiTags('Entities')
@Controller('entity')
// @ApiBearerAuth()
export class EntityController {
  constructor(private readonly entityService: MetaEntityService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all entities' })
  async getAll() {
    return this.entityService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a entity by ID' })
  async getById(@Param('id') id: string) {
    return this.entityService.getById(id);
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
  async create(@Body() data: CreateEntityDto) {
    return this.entityService.create(data);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Delete a entity by ID' })
  async deleteById(@Param('id') id: string) {
    return this.entityService.deleteById(id);
  }

  @Put(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a entity by ID' })
  async update(@Param('id') id: string, @Body() data: UpdateEntityDto) {
    return this.entityService.update(id, data);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a entity by ID' })
  async patch(@Param('id') id: string, @Body() data: UpdateEntityDto) {
    return this.entityService.update(id, data);
  }
}
