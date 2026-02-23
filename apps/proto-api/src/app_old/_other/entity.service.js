import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'uuid';
import { async_timer } from '@atlas/shared';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { from, mergeMap, tap } from 'rxjs';
import { Entity, Attribute, Entry, Value } from '@prisma/client';

import { PrismaService } from '../services/prisma.service';
// import { RedisService } from '../redis/redis-provider/redis.service';
import { DS_ERROR_EVENT, ErrorEventData } from '../event/error.event';

@Injectable()
export class EntitySevice {
  private entityes: Entity[];
  constructor(
    private emitter2: EventEmitter2,
    // private readonly redisService: RedisService,
    private readonly prisma: PrismaService
  ) {}

  @async_timer() getAll() {
    try {
      return this.prisma.entity.findMany({
        include: {
          children: true
        },
        orderBy: {
          updatedAt: 'desc'
        }
      });

      //return this.entityRep
      //  .createQueryBuilder('entity')
      //  .leftJoinAndSelect('entity.children', 'attr')
      //  .leftJoinAndSelect('attr.relation', 'relation_entity')
      //  .orderBy('entity.updatedAt', 'DESC')
      //  .getMany();
    } catch (error) {
      this.emitter2.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.getAll',
        error
      } as ErrorEventData);
    }
  }

  @async_timer() filter(filter: { paging?; name? } = {}) {
    try {
      if (!filter.paging) {
        filter.paging = {};
      }

      let where: any = {};
      if (filter.name) {
        where = {
          where: {
            name: {
              equals: filter.name
            }
          }
        };
      }

      return this.prisma.entity.findMany({
        where,
        include: {
          children: true
        },
        orderBy: {
          updatedAt: 'desc'
        }
      });

      //const base = this.entityRep
      //  .createQueryBuilder('entity')
      //  .leftJoinAndSelect('entity.children', 'child');// .where('entity.parent IS NULL');

      //if (filter.name) {
      //  base.andWhere('entity.name=:name', { name });
      //}
      //base.orderBy('entity.updatedAt', 'DESC');
      //return getDataSource({ base, ...filter.paging });
    } catch (error) {
      this.emitter2.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.filter',
        error
      } as ErrorEventData);
    }
  }

  // должен брать из кеша
  @async_timer() async getByName(entityId: string, def?: any) {
    try {
      let entityName: string;
      if (!validate(entityId)) {
        entityName = entityId;
        entityId = undefined;
      }

      if (this.entityes?.length) {
        const entity = this.entityes.find(
          (e) => e.name === entityName || e.id === entityId
        );
        if (entity) {
          return entity;
        }
      }

      const entity: Entity = await this.prisma.entity.findFirst({
        include: {
          children: true
        },
        where: {
          OR: [
            {
              id: {
                equals: entityId
              }
            },
            {
              name: {
                equals: entityName
              }
            }
          ]
        }
      });

      // const entity = await this.entityRep
      //   .createQueryBuilder('entity')
      //   .leftJoinAndSelect('entity.children', 'attr')
      //   .leftJoinAndSelect('attr.relation', 'relation_entity')
      //   .where('(entity.name=:entityName or entity.id=:entityId)', {
      //     entityName,
      //     entityId
      //   })
      //   .getOne();

      this.entityes?.push(entity);

      return entity;
    } catch (error) {
      this.emitter2.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.getByName',
        error
      } as ErrorEventData);
    }
  }

  @async_timer() async getByEntry(recordId: string) {
    try {
      return this.prisma.entity.findFirst({
        include: {
          entries: {
            where: {
              id: recordId
            }
          },
          children: true
        }
      });

      // return await this.entityRep
      //   .createQueryBuilder('entity')
      //   .leftJoinAndSelect('entity.children', 'attr')
      //   .leftJoinAndSelect('attr.relation', 'relation_entity')
      //   .leftJoin('entity.entries', 'record')
      //   .where('(record.id=:recordId)', { recordId })
      //   .getOne();
    } catch (error) {
      this.emitter2.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.getByEntry',
        error
      } as ErrorEventData);
    }
  }

  public async remove(entityId: string) {
    // const result = await this.entityRep.delete(entityId);
    const result = this.prisma.entity.delete({
      where: {
        id: entityId
      }
    });
    // this.redisService.emitEvent<ChangeEntityEventGateway>({
    //   type: 'entity.remove',
    //   data: { entityId }
    // });
    return result;
  }

  public async saveAttributesByEntity(entityId: string | Entity, attributes: Attribute[]) {
    try {
      let name: string;
      let entity: Entity;
      if (typeof entityId === 'object') {
        entity = entityId;
      } else if (typeof entityId === 'string') {
        if (!validate(entityId)) {
          name = <string>entityId;
          entityId = undefined;
        }

        entity = await this.prisma.entity.findFirst({
          where: {
            OR: [
              {
                id: { equals: entityId as string }
              },
              {
                name: { equals: name }
              }
            ]
          }
        });

        // entity = await this.entityRep
        //   .createQueryBuilder('entity')
        //   .where('(entity.name=:name or entity.id=:entityId)', {
        //     name,
        //     entityId
        //   })
        //   .getOne();
      }

      // prepare relation
      for (let i = 0; attributes.length > i; i++) {
        const attr = attributes[i];
        if (isRelation(attr.type)) {
          if (!attr.relationId) {
            const relationId = attr.relationId;
            if (relationId) {
              attr.relation = (await this.prisma.entity.findFirst({
                where: {
                  id: relationId
                }
              })) as any;
              // attr.relation = await this.entityRep
              //   .createQueryBuilder('entity')
              //   .where('entity.name=:name', { name })
              //   .getOne();
            } else {
              throw new HttpException(
                `Relation not found for field ${attr.name}`,
                HttpStatus.BAD_REQUEST
              );
            }
          }
        } else {
          delete attr.relationId;
          delete attr.relationMultiple;
        }
      }

      entity.children = attributes;
      if (entity.id) {
        await this.prisma.entity.update({
          where: {
            id: entity.id
          },
          data: entity
        });
      } else {
        await this.prisma.entity.create({
          data: entity
        });
      }
      // await this.entityRep.save(entity);

      return entity;
    } catch (error) {
      this.emitter2.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.saveFields',
        error
      } as ErrorEventData);
    }
  }

  async synchronize(newEntityes: (Entity & { children: Attribute[] })[]) {
    try {
      await from(newEntityes)
        .pipe(
          tap((attr) => {
            // delete empty id
            if (!attr.id) {
              delete attr.id;
            }
          }),
          mergeMap(async (entity) => {
            const entityes: Entity[] = await this.prisma.entity.findMany({
              where: {
                OR: [
                  {
                    id: entity.id
                  },
                  {
                    name: entity.name
                  }
                ]
              },
              include: {
                children: true
              }
            });
            // const _entityes = await this.entityRep
            //   .createQueryBuilder('entity')
            //   .where('entity.id=:id or entity.name=:name', {
            //     id: entity.id,
            //     name: entity.name
            //   })
            //   .getMany();

            if (entityes.length > 1) {
              await this.prisma.entity.deleteMany({
                where: {
                  id: {
                    in: entityes.map((e) => e.id)
                  }
                }
              }); // remove double
            } else if (entityes.length === 1) {
              entity.id = entityes[0].id; // update exist
            }

            // if (_entityes.length > 1) {
            //   await this.entityRep.remove(_entityes); // remove double
            // } else if (_entityes.length === 1) {
            //   entity.id = _entityes[0].id; // update exist
            // }

            const attributes: Attribute[] = entity.children;
            if (!entity.id) {
              delete entity.children;
              this.prisma.entity.create({
                data: entity as Entity
              });
              // await this.entityRep.save(entity);
              // this.redisService.emitEvent<ChangeEntityEventGateway>({
              //   type: 'entity.create',
              //   data: { entityId: entity.id }
              // });
            }

            return this.saveAttributesByEntity(entity, attributes);
          })
        )
        .toPromise();

      return newEntityes;
    } catch (error) {
      this.emitter2.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.synchronize',
        error
      } as ErrorEventData);
    }
  }

  // recordValues - могут быть с псевдовалуе value.type = PARENT если есть такое значение то добавляем record к родителю через псевдовалуе
  @async_timer() async saveEntryByValues(
    valueParents: Value[],
    entity: Entity & { children: Attribute[] },
    record: Entry
  ) {
    try {
      for (let i = 0; valueParents.length > i; i++) {
        const value = valueParents[i];

        if (
          [
            EntityAttributeType.PARENT,
            EntityAttributeType.PARENT_MANY
          ].includes(value.type)
        ) {
          // TODO(проверить) это псевдо валуе
          valueParents.splice(i--, 1); // удаляем чтобы не сохранять псевдо value

          const valueKey = VALUE_KEY_SET[value.type];
          const parentId: string = value[valueKey];
          if (parentId) {
            const attr = entity.children.find((a) => a.name === value.name);

            // сдесь должно устанавливатся parentId
            this.addEntryByValue(
              attr.type,
              attr.relationName,
              parentId,
              record.id
            );
          }
        }
      }
    } catch (error) {
      this.emitter2.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.checkParent',
        error
      } as ErrorEventData);
    }
  }

  // проверяет есть ли value для record(entryChildId), если нет создает value(для parentId) и добавляет entryChildId
  public async addEntryByValue(
    type: EntityAttributeType,
    attributeName: string,
    valueParentId: string,
    entryChildId: string
  ) {
    const isMany = isManyRelation(type); // всегда мани
    // [
    //   EntityAttributeType.RELATION_MANY,
    //   EntityAttributeType.PARENT_MANY
    // ].includes(type);

    // const valueRep = this.valueRep;

    //if (isMany) {
    //  valueRep = this.valueRep;
    //}

    // START
     let parentValue: Value = await this.prisma.value.findFirst({
      where: {
        name: attributeName,
        parentId: valueParentId,
        children: {
          some: {
            entryId: entryChildId
          }
        }
      }
    });

    // let parentValue: Value = await valueRep
    //   .createQueryBuilder('value')
    //   .leftJoinAndSelect('value.parent', 'value_parent')
    //   .leftJoinAndSelect(
    //     'value.children',
    //     'entry_value',
    //     '(entry_value.id=:entryChildId)',
    //     {
    //       entryChildId
    //     }
    //   )
    //   // чтобы небыло дублей(parent_value = null)
    //   .where('(value_parent.id=:valueParentId)', { valueParentId })
    //   .andWhere('(value.name=:attributeName)', { attributeName })
    //   .getOne();

    if (!parentValue) {
      // если не существует parent_value
      parentValue = this.createValue({
        type,
        attributeName,
        parentId: valueParentId
      });
      parentValue.children = [{ id: entryChildId }]; // child record
      await valueRep.save(parentValue);
    } else if (parentValue.children.length === 0) {
      if (isMany) {
        // если нет такова valueEntry
        await this.recordRep
          .createQueryBuilder()
          .relation('parent')
          .of(entryChildId)
          .add(parentValue); // @MANY
      } else {
        // если нет такова valueEntry
        await this.recordRep
          .createQueryBuilder()
          .relation('parent')
          .of(entryChildId)
          .set(parentValue); // @ONE
      }
    }
  }

  createValue({
    attributeName,
    parentId,
    type,
    children,
    childrenProperty
  }: {
    attributeName: string;
    parentId: string;
    type: EntityAttributeType;
    children?: Entry[];
    childrenProperty?: any;
  }) {
    try {
      const value = new Value();
      value.type = type;
      value.name = attributeName;
      value.parent = { id: parentId }; // record parent
      value.children = children ?? [];
      if (childrenProperty) {
        value.childrenProperty = JSON.stringify(childrenProperty) as any;
      }

      return value;
    } catch (error) {
      this.emitter2.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.createValue',
        error
      } as ErrorEventData);
    }
  }

  public async createValueAndSave({
    attributeName,
    parentId,
    type,
    children,
    childrenProperty
  }: {
    attributeName: string;
    parentId: string;
    type: EntityAttributeType;
    children?: Entry[];
    childrenProperty?: any;
  }) {
    try {
      const value = this.createValue({
        attributeName,
        parentId,
        type,
        children,
        childrenProperty
      });

      await this.valueRep.save(value);
      return value;
    } catch (error) {
      this.emitter2.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.createValueAndSave',
        error
      } as ErrorEventData);
    }
  }

  public async createEntryByEntity(entity: Entity) {
    try {
      const record = this.recordRep.create();
      record.entity = entity;
      await this.recordRep.save(record);
      // this.redisService.emitEvent<ChangeEntryEventGateway>({
      //   type: DS_CREATE_RECORD,
      //   data: { recordId: record.id, entityName: entity.id }
      // });

      return record;
    } catch (error) {
      this.emitter2.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.createEntryByEntity',
        error
      } as ErrorEventData);
    }
  }

  // создаем или получаем запись
  public async getOrCreateEntry(recordId: string, entity: Entity) {
    let record: Entry;
    if (recordId) {
      record = await this.recordRep
        .createQueryBuilder('record')
        .where('record.id=:recordId', { recordId })
        .getOne();
    } else {
      record = await this.createEntryByEntity(entity);
      recordId = record.id;
    }

    return record;
  }
}
