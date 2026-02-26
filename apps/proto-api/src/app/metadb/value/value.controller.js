/* eslint-disable @nx/enforce-module-boundaries */
import {
  Controller,
  Get,
  Post,
  Param,
  HttpException,
  Body,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { forkJoin, map } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { ValueSevice } from './value.service.js';
import { MetaValue } from '@metadb/client';
import { MetaEntityService } from '../entity';

@UseGuards(AuthGuard())
@Controller('value')
export class ValueController {
  constructor(
    private readonly valueSevice: ValueSevice,
    private readonly entitySevice: MetaEntityService,
    //@InjectRepository(MetaValue) private readonly valueRep: Repository<MetaValue>
  ) {}

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

  @Post('save-values')
  public async saveValues(
    @Body() values: MetaValue[],
    //@QueryPayload() query: ValueQuery
    query: any
  ) {
    const result = await this.valueSevice.save(values, query);

    if (result) {
      const { values, record } = result;
      this.prepareValue(values);
      return { record };
    } else {
      throw new HttpException(
        'Invalid query params(recordId, entityId)',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  protected prepareValue(values: any[]) {
    values.forEach((value) => {
      Object.keys(value).forEach((key) => {
        if (value[key] === null) {
          delete value[key];
        }
      });
    });
  }

  @Post('push/:recordId')
  public async addRelation(
    @Param('recordId') recordId: string,
    @Body() values: MetaValue[]
  ) {
    const resultValues = await this.valueSevice.push(recordId, values);

    if (resultValues) {
      this.prepareValue(resultValues);
      return resultValues;
    } else {
      throw new HttpException(
        'Invalid query params(recordId, entityId)',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
