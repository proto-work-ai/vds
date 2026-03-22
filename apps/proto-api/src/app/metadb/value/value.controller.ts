/* eslint-disable @nx/enforce-module-boundaries */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { forkJoin, map } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { MetaValueSevice } from './value.service';
import { CreateAttributeDto } from '../attribute/dto';
import { MetaValue } from '@metadb/client';

@UseGuards(AuthGuard())
@Controller('value')
export class ValueController {
  constructor(
    private readonly valueSevice: MetaValueSevice,
    // private readonly entitySevice: MetaEntityService,
    // @InjectRepository(MetaValue) private readonly valueRep: Repository<MetaValue>
  ) { }


  @Get()
  @ApiResponse({ status: 200, description: 'Get all values' })
  async getAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.valueSevice.getAll({ limit: Number(limit ?? 10), page: Number(page ?? 1) });
  }

  // @Get(':id')
  // @ApiResponse({ status: 200, description: 'Get a attribute by ID' })
  // async getById(@Param('id') id: string) {
  //   return this.valueSevice.getById(id);
  // }

  @Delete(':name/:parentId')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Delete a attribute by ID' })
  async deleteById(@Param('name') name: string, @Param('parentId') parentId: string) {
    return this.valueSevice.deleteById({ name, parentId });
  }

  @Post(':name/:parentId')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Create a new attribute' })
  async create(@Param('name') name: string, @Param('parentId') parentId: string, @Body() data: MetaValue) {
    return this.valueSevice.create({ name, parentId }, data);
  }

  @Put(':id')
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a attribute by ID' })
  async update(@Param('name') name: string, @Param('parentId') parentId: string, @Body() data: MetaValue): Promise<{ bigint: bigint | null; name: string; parentId: string; attributeId: string | null; type: number; childrenProperty: string | null; order: number | null; bit: number | null; tinyint: number | null; smallint: number | null; int: number | null; float: number | null; date: Date | null; time: Date | null; datetime: Date | null; varchar: string | null; text: string | null; json: import("c:/git/proto.cms/libs/metadb/client/src/lib/runtime/client").JsonValue | null; blob: import("c:/git/proto.cms/libs/metadb/client/src/lib/runtime/client").Bytes | null; createdAt: Date; updatedAt: Date; }> {
    return this.valueSevice.update({ name, parentId }, data);
  }

  @Get('filter/:entityId')
  public async filterByField(@Param('entityId') entityId: string) {
    const valueOne = null;
    // const valueOne = this.valueRep
    //   .createQueryBuilder('value')
    //   .leftJoinAndSelect('value.attribute', 'field')
    //   .leftJoinAndSelect('value.parent', 'record')
    //   .where('field.id=:entityId', { entityId })
    //   .getMany();

    // const valueMany = this.valueManyRep
    //   .createQueryBuilder('value')
    //   .leftJoinAndSelect('value.attribute', 'field')
    //   .leftJoinAndSelect('value.parent', 'record')
    //   .where('field.id=:entityId', { entityId })
    //   .getMany();

    const values = await forkJoin([
      valueOne
      // valueMany
    ])
      .pipe(map((values) => values.flat()))
      .toPromise();

    // deserializationValue(values);

    return values;
  }

  // @Get('filter-by-record')
  // public async filterByEntry(@QueryPayload() query: RelationQuery) {
  //   const values = await this.valueSevice.getValues(query);
  //   const entity = await this.entitySevice.getByEntry(query.id);
  //   deserializationValue(values, entity);
  //   return values;
  // }

  // @Post('save-values')
  // public async saveValues(
  //   @Body() values: MetaValue[],
  //   //@QueryPayload() query: ValueQuery
  //   query: any
  // ) {
  //   const result = await this.valueSevice.save(values, query);

  //   if (result) {
  //     const { values, record } = result;
  //     this.prepareValue(values);
  //     return { record };
  //   } else {
  //     throw new HttpException(
  //       'Invalid query params(recordId, entityId)',
  //       HttpStatus.BAD_REQUEST
  //     );
  //   }
  // }

  protected prepareValue(values: any[]) {
    values.forEach((value) => {
      Object.keys(value).forEach((key) => {
        if (value[key] === null) {
          delete value[key];
        }
      });
    });
  }

  // @Post('push/:recordId')
  // public async addRelation(
  //   @Param('recordId') recordId: string,
  //   @Body() values: MetaValue[]
  // ) {
  //   const resultValues = await this.valueSevice.push(recordId, values);

  //   if (resultValues) {
  //     this.prepareValue(resultValues);
  //     return resultValues;
  //   } else {
  //     throw new HttpException(
  //       'Invalid query params(recordId, entityId)',
  //       HttpStatus.BAD_REQUEST
  //     );
  //   }
  // }
}
