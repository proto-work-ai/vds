import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  HttpException,
  Body,
  HttpStatus
} from '@nestjs/common';
import { clearEmptyByObject } from '@atlas/utils';
import { validate } from 'uuid';
import { DS_ENTITY_API } from '@proto/ui/client';
import { EntitySevice } from './entity.service';

@Controller(DS_ENTITY_API)
export class EntityController {
  constructor(
    private readonly entitySevice: EntitySevice,
    @InjectRepository(QtEntity) private readonly entityRep: Repository<QtEntity>,
    @InjectRepository(QtEntityAttribute) private readonly attributeRep: Repository<QtEntityAttribute>
  ) {}

  @Get('filter')
  public async filter(
    @Query('take') take: number = 10,
    @Query('page') page: number = 1
  ) {
    const base = this.entityRep
      .createQueryBuilder('entity')
      .leftJoinAndSelect('entity.children', 'attr')
      .orderBy('entity.updatedAt', 'DESC');

    return getDataSource({ base, take, page });
  }

  @Post('remove/:id')
  public async remove(@Param('id') id: string) {
    const entity = await this.entityRep.findOne({
      where: { id },
      relations: ['children']
    });

    if (!entity) {
      throw new HttpException('Not found', 404);
    } else {
      await this.entityRep.remove(entity.children);
      const data = await this.entityRep.remove(entity);
      return data;
    }
  }

  @Get('/get/:id')
  public async get(@Param('id') id: string, @Param('name') name: string) {
    if (id !== undefined && !validate(id)) {
      name = id;
      id = undefined;
    }

    const attributes = await this.attributeRep
      .createQueryBuilder('attr')
      .leftJoinAndSelect('attr.relation', 'relation')
      .leftJoin('attr.parent', 'entity')
      // .orderBy('field.order', 'ASC')
      .where('(entity.name=:name or entity.id=:id)', { name, id })
      .getMany();

    return { attributes, name, id } || null;
  }

  @Post('save')
  public async save(@Body() entitye: QtEntity) {
    if (!entitye.name) {
      throw new HttpException('Введите название', HttpStatus.BAD_REQUEST);
    }

    if (!entitye.id) {
      delete entitye.id;
    }

    await this.entityRep.save(entitye);
    return entitye;
  }

  @Post('synchronize')
  public async synchronize(@Body() entityes: QtEntity[]) {
    // valiedate name
    entityes.forEach((entity) => {
      if (!entity.name) {
        throw new HttpException(`Введите название`, HttpStatus.BAD_REQUEST);
      }
    });

    await this.entitySevice.synchronize(entityes);
    return await this.entitySevice.filter({ paging: { take: 100 } });
  }

  @Post('save-attributes/:entityId')
  public async saveFields(
    @Param('entityId') entityId: string,
    @Body() attributes: QtEntityAttribute[]
  ) {
    await this.entitySevice.saveAttributesByEntity(entityId, attributes);

    const data = await this.attributeRep
      .createQueryBuilder('attr')
      .leftJoinAndSelect('attr.relation', 'relation')
      .innerJoin('attr.parent', 'entity')
      .where('entity.id=:entityId', { entityId })
      // .orderBy('attr.order', 'ASC')
      .getMany();

    return data;
  }

  @Get('/attributes/:id')
  public async getFields(@Param('id') id: string) {
    let name: string;
    if (!validate(id)) {
      // throw new HttpException('Entity cannot be edited', HttpStatus.BAD_REQUEST);
      name = id;
      id = undefined;
    }

    const attributes = await this.attributeRep
      .createQueryBuilder('attr')
      .leftJoinAndSelect('attr.relation', 'relation')
      .leftJoin('attr.parent', 'entity')
      .where('entity.id=:id or entity.name=:name', { id, name })
      .orderBy('attr.order', 'ASC')
      .getMany();

    return clearEmptyByObject(attributes);
  }
}
