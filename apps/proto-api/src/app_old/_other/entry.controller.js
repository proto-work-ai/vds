import { DS_RECORD_API } from '@proto/ui/shared';
import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  HttpException,
  Body,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { EntityQuery, ManyQuery, OneQuery, SaveQuery, UserQuery } from '@proto/ui/core';
import { AuthGuard } from '@nestjs/passport';
import { isEmptyObject } from '@atlas/utils';

import { QtRecord, QtValue } from '../model';
import { EntrySevice } from '../services';
import { QueryPayload } from '../common';

@UseGuards(AuthGuard())
@Controller(DS_RECORD_API)
export class RecordController {
  constructor(protected recordSevice: EntrySevice) {}

  @Get('get')
  public async getByEntry(@Query('query') _query: string) {
    const query = JSON.parse(_query);
    const data = await this.recordSevice.get(query);

    if (data) {
      return data;
    } else {
      throw new HttpException(
        HttpStatus.NOT_FOUND.toString(),
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Get('filter')
  public async filterByEntity(
    @Query('format') format: 'record',
    @QueryPayload() query: ManyQuery
  ) {
    return this.recordSevice.filter(query, format);
  }

  @Post('remove/:id')
  public async remove(@Param('id') id: string, @QueryPayload() query: UserQuery) {
    const data = await this.recordSevice.remove(id, query);
    return data;
  }

  @Post('double/:id') // дублируем запись
  public async double(
    @Param('id') id: string,
    @Body('attributes') attributes: string[]
  ) {
    const data = await this.recordSevice.double(id, attributes);
    return JSON.stringify(data.id);
  }

  @Post('save')
  public async save(
    @Body('record') record: QtRecord,
    @Body('removed') removed: string[],
    @QueryPayload() query: OneQuery
  ) {
    let data = await this.recordSevice.save(record, query, removed);

    if (!isEmptyObject(query.relation)) {
      query.id = data?.id;
      data = await this.recordSevice.get(query);
    }

    if (data) {
      return data;
    } else {
      throw new HttpException(
        'Invalid query params(recordId, entityId)',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // сохраняем список записей
  @Post('save-entries')
  public async saveEntries(
    @Body('entries') entries: QtRecord[],
    @Body('removed') removed: string[],
    @QueryPayload() query: OneQuery
  ) {
    const data = await this.recordSevice.saveEntries(entries, query, removed);

    if (query.filter || query.relation) {
      return this.recordSevice.filter(query);
    }

    if (data) {
      return data;
    } else {
      throw new HttpException(
        'Invalid query params(recordId, entityId)',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // сохраняем данные в отношении
  @Post('save-value')
  public async saveValue(
    @Body() value: QtValue,
    @QueryPayload() query: SaveQuery
  ) {
    value = await this.recordSevice.saveValue(value, query);

    // if (value) {
    //  if (query.relation || query.filter) {
    //    value.children = (await this.recordSevice.filter(query)).data;
    //  }
    // }

    if (value) {
      return value;
    } else {
      throw new HttpException(
        'Invalid query params(recordId, entityId)',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
