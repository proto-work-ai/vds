/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'uuid';
import { forkJoin, map } from 'rxjs';
import { DS_ERROR_EVENT, ErrorEventData } from '../event';
import { MetaAttribute, MetaEntity, MetaValue } from '@metadb/prisma';

@Injectable()
export class ValueSevice {
  constructor(
    private readonly roleSevice: RoleSevice,
    private readonly entitySevice: EntitySevice,
    @InjectRepository(MetaValue) private readonly valueRep: Repository<MetaValue>,
    @InjectRepository(QtRecord)
    private readonly recordRep: Repository<QtRecord>,
    @InjectRepository(MetaEntity) private readonly entityRep: Repository<MetaEntity>
  ) {}

  protected prepareResult(values: MetaValue[]) {
    values.map((v) => {
      delete v.parent;
      delete v.attribute;
      delete v.createdAt;
      delete v.updatedAt;
    });

    return values;
  }

  /*
   * обновляем attr и entity у value
   * удаляем схемму без id а также устанавливаем тип если не указан
   */
  async updateValuesByEntityAndParent(
    values: Value[],
    entity: Entity,
    record: Entry
  ) {
    const result: Promise<any>[] = [];

    for (let i = 0; values.length > i; i++) {
      const value = values[i];
      // set parent
      value.parent = { id: record.id };

      delete value.attribute;
      const attr = entity.children.find((f) => f.name === value.name);
      if (attr) {
        result.push(this.updateValueByField(value, attr, entity));
      } else {
        console.warn('[warn] save value not field', entity.name);
      }

      delete value.createdAt;
      delete value.updatedAt;
    }

    await Promise.all(result);
    return values;
  }

  // обновляем field у value
  public async updateValueByField(
    value: MetaValue,
    attr: MetaAttribute,
    entity: MetaEntity
  ) {
    value.type = attr.type || EntityAttributeType.STRING;
    value.name = attr.name;
    value.attribute = { name: attr.name, parent: { id: entity.id } };

    if (attr.hash) {
      const valueKey = VALUE_KEY_SET[value.type];
      const valueString = value[valueKey];
      if (attr.hash === 'password') {
        const hash = await hashPassword(valueString);
        value[valueKey] = hash;
      } else {
        console.error('updateValueByField');
      }
    }
  }

  // убираем дубли
  protected async checkDoubles(record: QtRecord) {
    const recordValues = [...record.children].sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      }
      if (a.updatedAt < b.updatedAt) {
        return 1;
      }
      return 0;
    });

    for (let i = 0; recordValues.length > i; i++) {
      const value = recordValues[i];
      const _doubleValues = recordValues.filter(
        (v) => v.name === value.name && value !== v
      );

      // remove double
      for (let i = 0; _doubleValues.length > i; i++) {
        const _double = _doubleValues[i];
        const value = recordValues.splice(recordValues.indexOf(_double), 1)[0];
        if (value) {
          if (isRelation(value.type)) {
            await this.valueRep.remove(value);
          }
          {
            await this.valueRep.remove(value);
          }
        }
      }
    }

    return recordValues;
  }

  protected async getEntity({
    entityName,
    entityId,
    recordId
  }: {
    entityName?: string;
    entityId?: string;
    recordId?: string;
  }) {
    if (!validate(entityId)) {
      entityName = entityId;
      entityId = undefined;
    }

    const base = this.entityRep
      .createQueryBuilder('entity')
      .leftJoinAndSelect('entity.children', 'field');

    let entity: MetaEntity;

    if (recordId) {
      if (!validate(entityId)) {
        entityName = entityId;
        entityId = undefined;
      }

      entity = await base
        .leftJoin('entity.entries', 'record')
        .where('record.id=:recordId', { recordId })
        .getOne();

      return { entityName, entityId, entity };
    } else {
      entity = await base
        .where('(entity.name=:entityName or entity.id=:entityId)', {
          entityName,
          entityId
        })
        .getOne();
    }

    if (!entity) {
      throw new HttpException(
        `Entity not found(${entityName || entityId})`,
        HttpStatus.BAD_REQUEST
      );
    }

    return {
      entity,
      entityName: entity.name,
      entityId: entity.id
    };
  }

  // сохраняем значения и создаем record если его не было
  async save(
    parentValues: MetaValue[],
    { recordId, entityId, userId }: ValueQuery
  ) {
    try {
      const { entity, entityName } = await this.getEntity({ entityId });

      // создаем или получаем запись
      const record = await this.entitySevice.getOrCreateEntry(
        recordId,
        entity
      );

      // обновляем роль
      await this.roleSevice.extendForEntry(record, entity, userId);

      await this.saveByParent(parentValues, entity, record);

      this.emitter2.emit(DS_UPDATE_RECORD, {
        recordId,
        entityName
      } as ChangeEntryEventData);

      delete record.entity;

      record.children = parentValues;

      return {
        record,
        values: this.prepareResult(parentValues)
      };
    } catch (error) {
      this.emitter2.emit(DS_ERROR_EVENT, {
        error,
        name: 'ValueSevice.save'
      } as ErrorEventData);
    }
  }

  public async saveByParent(
    values: Value[],
    entity: Entity,
    record: Entry
  ) {
    // удаляем схемму без id а также устанавливаем тип если не указан
    await this.updateValuesByEntityAndParent(values, entity, record);

    // удяляем псевдовалуе
    await this.entitySevice.saveEntryByValues(values, entity, record);

    // сохраняем
    await this.saveValues(values);
  }

  public async saveValues(values: IMetaDbValue[]) {
    const relation = [];
    // const relationMany = [];

    values.forEach((value) => {
      // const attr = attributes.find((a) => a.name === value.name);
      // const type = attr.type || value.type;
      relation.push(value);

      // if (attr) {
      //   if (type === EntityAttributeType.RELATION_MANY) {
      //     relation.push(value);
      //   } else {
      //     relation.push(value);
      //   }
      // } else if (type === EntityAttributeType.RELATION_MANY) {
      //   relation.push(value);
      // } else {
      // }
    });

    await Promise.all([
      this.valueRep.save(relation)
      // this.valueManyRep.save(relationMany)
    ]);

    return [relation].flat();
  }

  public async getValues(query: RelationQuery) {
    const { id, relation } = query;

    async function getValues(repositoty: Repository<MetaValue>) {
      //
      const base = repositoty
        .createQueryBuilder('value')
        .leftJoinAndSelect('value.attribute', 'attribute');

      // relation
      base
        .leftJoinAndSelect('value.children', 'value_entry')
        .leftJoinAndSelect('value_entry.children', 'entry_value');

      // parent
      base
        .leftJoin('value.parent', 'record')
        .where('record.id=:recordId', { recordId: id });

      if (relation && typeof relation === 'object') {
        const attrNames = Object.keys(relation);
        base.andWhere(`value.name in (:...attrNames)`, { attrNames });
      }

      return base.getMany();
    }

    return forkJoin([
      getValues(this.valueRep)
      // getValues(this.valueManyRep)
    ])
      .pipe(map((values) => values.flat() as MetaValue[]))
      .toPromise();
  }

  // добавляем занчения в список не заменяя
  async push(recordId: string, values: MetaValue[]) {
    if (!recordId) {
      throw new HttpException(`Not found recordId`, HttpStatus.BAD_REQUEST);
    }

    if (!Array.isArray(values) || !values.length) {
      throw new HttpException(`Not found values`, HttpStatus.BAD_REQUEST);
    }

    const { entity } = await this.getEntity({ recordId });

    const record = await this.recordRep
      .createQueryBuilder('record')
      .where('record.id=:recordId', { recordId })
      .getOne();

    if (!record) {
      throw new HttpException(`Not found record`, HttpStatus.BAD_REQUEST);
    }

    await this.entitySevice.saveEntryByValues(values, entity, record);

    // устанавливаем значения
    await this.addRelationOrMap(values, entity, record);

    this.emitter2.emit(DS_PUSH_VALUE, { recordId } as ChangeEntryEventData);

    return this.prepareResult(values);
  }

  // делает выборку values и добвляет им значения(relation или map)
  protected async addRelationOrMap(
    values: Value[],
    entity: Entity,
    record: Entry
  ) {
    await this.updateValuesByEntityAndParent(values, entity, record);

    const all: Promise<any>[] = [];
    for (let i = 0; values.length > i; i++) {
      const value = values[i];

      if (
        [
          EntityAttributeType.PARENT,
          EntityAttributeType.PARENT_MANY,
          EntityAttributeType.PARENT_COUNT
        ].includes(value.type)
      ) {
        console.warn('ValueSevice:pushMapOrRelation', value);
        continue;
      }

      value.parent = record;
      if (value.type === EntityAttributeType.RELATION) {
        value.children.forEach(async (qt_entry): Promise<void> => {
          all.push(
            new Promise<void>(async (res) => {
              try {
                await this.valueRep
                  .createQueryBuilder()
                  .relation('children')
                  .of(value)
                  .add(qt_entry.id);

                res();
              } catch (error) {
                // если value не существует
                console.error('addRelationOrMap.error', error);
                await this.entitySevice.addEntryByValue(
                  value.type,
                  value.name,
                  record.id,
                  qt_entry.id
                );
                res();
              }
            })
          );
        });
      } else if (value.type === EntityAttributeType.RELATION_MANY) {
        value.children.forEach(async (qt_entry) => {
          all.push(
            new Promise<void>(async (res) => {
              try {
                await this.valueRep
                  .createQueryBuilder()
                  .relation('children')
                  .of(value)
                  .add(qt_entry.id);

                res();
              } catch (error) {
                // если value не существует
                console.error('addRelationOrMap.error', error);
                await this.entitySevice.addEntryByValue(
                  value.type,
                  value.name,
                  record.id,
                  qt_entry.id
                );
                res();
              }
            })
          );
        });
      } else {
        all.push(this.valueRep.save(value));
      }
    }

    Promise.all(all); // save

    return values;
  }
}
