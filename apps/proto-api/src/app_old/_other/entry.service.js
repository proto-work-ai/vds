import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { clearEmty } from '@atlas/utils';
import { validate } from 'uuid';
import { async_timer, UserRoleSet } from '@atlas/shared';

import { EventEmitter2 } from '@nestjs/event-emitter';
import { forkJoin } from 'rxjs';

import { DS_ERROR_EVENT, ErrorEventData } from '../event';

import { ValueSevice } from './value.service';
import { Entity, Entry  } from '@prisma/client';

type RelationAttribute = [IMetaDbAttribute, any][];

// список существующих записей(STORE)
const existsSet = new Set<string>();

@Injectable()
export class EntrySevice {
  constructor(
    private readonly emitter: EventEmitter2,
    private readonly roleSevice: RoleSevice,
    private readonly entitySevice: EntitySevice,
    private readonly valueSevice: ValueSevice,
    @InjectRepository(QtRecord) private readonly recordRep: Repository<QtRecord>,
    @InjectRepository(QtValue) private readonly valueRep: Repository<QtValue>
  ) {}

  // проверяем существует ли данная запись
  @async_timer() async exists(recordId, cache = true) {
    try {
      if (cache && existsSet.has(recordId)) {
        return true;
      }

      const base = this.recordRep
        .createQueryBuilder('record')
        .select('record.id')
        .where('record.id=:recordId', { recordId });

      const result = !!(await base.getOne());

      if (result) {
        existsSet.add(recordId);
      } else {
        existsSet.delete(recordId);
      }

      return result;
    } catch (error) {
      this.emitter.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.exists',
        error
      } as ErrorEventData);
    }
  }

  @async_timer() async get(query: string | OneQuery) {
    try {
      if (typeof query === 'string') {
        query = { id: query };
      }

      const { id, relation, filter } = query || {};
      let { entityId } = query || {};

      let entityName: string;
      if (entityId !== undefined && !validate(entityId)) {
        entityName = entityId as string;
        entityId = undefined;
      }

      const entity = await this.entitySevice.getByName(entityName);
      const base = this.recordRep.createQueryBuilder('record');

      // .leftJoinAndSelect('record.resource', 'resource')
      await this.leftJoinByEntity(base, relation, entity);

      // filter by parent(загружаем по родителю) TODO => сдесь загружаем по ид и родителя не учитываем
      // this._leftJoinParent(base, relation, null, 'record');

      if (id) {
        // filter: id
        base.where('record.id=:recordId', { recordId: id });
      } else if (entityName || entityId) {
        base.leftJoin('record.entity', 'entity');
        base.where('(entity.name=:entityName or entity.id=:entityId)', {
          entityName,
          entityId
        });

        await this.leftJoinFilter(base, filter, entityName);
      } else {
        console.error('Error get(query: string | OneQuery)');
      }

      const record = await base.orderBy('record.updatedAt', 'DESC').getOne();

      // обновляем поля(серилизация десерилизация полей)
      deserializationEntry(record);

      return record;
    } catch (error) {
      this.emitter.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.get',
        error
      } as ErrorEventData);
    }
  }

  public async leftJoinFilter(
    base: SelectQueryBuilder<any>,
    filter: QtFilter<any>,
    entityName: string
  ) {
    const fields = filter?.fields;
    if (fields && Object.entries(fields).length) {
      const entity = await this.entitySevice.getByName(entityName);
      Object.entries(filter?.fields).forEach(([attributeName, recordId]) => {
        const attr = entity.children.find((a) => a.name === attributeName);
        if (
          [EntityAttributeType.PARENT, EntityAttributeType.PARENT_MANY].includes(
            attr.type
          ) &&
          typeof recordId === 'string'
        ) {
          base.leftJoin('record.parent', 'parent_value');
          base.leftJoin('parent_value.parent', 'parent_entry');
          base.andWhere('(parent_entry.id=:recordId)', { recordId });
        }
      });
    }
  }

  public async getObject<T extends IQtObject>(query: string | OneQuery): Promise<T> {
    const record = await this.get(query);
    return entryToObject(record) as T;
  }

  @async_timer() async filter(query: ManyQuery, format?: DynamicValueFormat) {
    try {
      const { filter, relation, userId } = query;
      let { entityId } = query;

      let entityName: string;
      if (entityId !== undefined && !validate(entityId)) {
        entityName = entityId;
        entityId = undefined;
      }
      const entity = await this.entitySevice.getByName(entityName);

      const base = this.recordRep
        .createQueryBuilder('record')
        .leftJoin('record.entity', 'entity'); // .leftJoinAndSelect('value_list.field', 'field')

      // children
      await this.leftJoinByEntity(base, relation, entity, 'record');

      // filter: entity
      base.where('(entity.name=:entityName or entity.id=:entityId)', {
        entityName,
        entityId
      });

      if (entity.roleable) {
        // fileter by role
        this._addWhereByRole(base, userId, 'record');
      }

      // load by parent
      this._leftJoinParent(base, relation, entity.children, 'record');

      // filter: fields
      this._filterByAttributes(base, filter?.fields, entity.children);

      const search = filter?.search;
      // filter: search
      if (Array.isArray(search) && search.length === 2) {
        const [attributeName, filterValue] = search;
        this._addWhereBySearch(
          base,
          entity.children,
          attributeName,
          filterValue
        );
      }

      // filter: order
      base.orderBy('record.updatedAt', 'DESC');

      const page = filter?.page || 1;
      const take = filter?.take || 10;

      const result = await getDataSource<QtRecord>({ base, take, page });

      if (format === 'object') {
        result.data = entryToObject(result.data);
      } else {
        const { entries } = entriesToRaw(result.data, entity.children);
        result.data = entries as QtRecord[];
      }

      deserializationEntry(result.data);
      clearEmty(result.data);

      // (data as any).childrenTree = await this.treeRepository.findDescendantsTree(data.data[0
      return result;
    } catch (error) {
      this.emitter.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.filter',
        error
      } as ErrorEventData);
    }
  }

  @async_timer() async save(
    record: QtRecord,
    query: EntityQuery,
    valueRemoved?: string[]
  ) {
    try {
      const { entityId, userId } = query;

      const entity: QtEntity = await this.entitySevice.getByName(entityId);
      // check entity
      if (entity) {
        record.entity = entity;
      } else {
        throw new HttpException(
          `Entity not found(${entityId})`,
          HttpStatus.BAD_REQUEST
        );
      }

      // обновляем поля(серилизация десерилизация полей)
      serializationEntry(record);

      if (record.id) {
        if (valueRemoved?.length) {
          await this.checkValues(record, valueRemoved);
        }
      }

      // удаляем псевдовалуе если есть
      const checkParentChildren = [];
      record.children = record.children.filter((value) => {
        if (
          [EntityAttributeType.PARENT, EntityAttributeType.PARENT_MANY].includes(
            value.type
          )
        ) {
          checkParentChildren.push(value);
          return false;
        }

        return true;
      });

      await this.saveEntryAndValues(record, entity, userId);

      // добавляем record к родителю через псевдовалуе
      /* await */ this.entitySevice.saveEntryByValues(
        checkParentChildren,
        entity,
        record
      );

      deserializationEntry(record);

      this.emitter.emit(DS_UPDATE_RECORD, {
        recordId: record.id,
        entityName: entity.name
      } as ChangeEntryEventData);
      return record;
    } catch (error) {
      this.emitter.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.save',
        error
      } as ErrorEventData);
    }
  }
  // await this.recordRep.save(record, { listeners: false, transaction: false, data: null });
  protected async saveEntryAndValues(
    record: Entry,
    entity: Entity,
    userId: string
  ) {
    const values = [record.children || []].flat();

    if (!record.id) {
      const { id } = await this.entitySevice.createEntryByEntity(entity);
      record.id = id;
    }

    values.forEach((value) => {
      // обновляем parent иначе не сохранит отношение(бага библиотеки)
      value.parent = { id: record.id };
      const attr = entity?.children?.find((a) => a.name === value.name);
      if (attr) {
        value.type = attr.type;
        value.attribute = attr;
      }
    });

    await Promise.all([
      this.valueRep.save(record.children || [])
      // this.valueManyRep.save(record.childrenMany || [])
    ]);

    // назначаем роль если нет
    if (userId) {
      await this.roleSevice.extendForEntry(record, entity, userId);
    }

    return record;
  }
  // обновляем ресурсы перед сохранением записи
  @async_timer() protected checkResources(record: QtRecord) {
    record.resource = this.geResourceByValue(record).map((id) => ({ id })); // TODO включиь если будет нужно
  }
  // явно удаляем values если обнулили childs
  @async_timer() protected async checkValues(
    record: QtRecord,
    valueRemoved?: string[]
  ) {
    if (record.id) {
      if (
        record.children !== undefined &&
        (record.children === null || record.children.length === 0)
      ) {
        // this.deleteValueByParentId(record.id);
      }

      // если есть признак таво что поменяли values то удаляем все чтобы заново записать
      // else if (Array.isArray(record.children) && record.children.some((v) => !v.id)) {
      //  await this.deleteValueByParentId(record.id);
      // }

      if (Array.isArray(valueRemoved)) {
        this.deleteValueByIds(valueRemoved);
      }
    }
  }
  @async_timer() async saveEntries(
    entries: QtRecord[],
    query: OneQuery,
    valueRemoved?: string[]
  ) {
    try {
      const list = entries.map((record) => {
        const result = this.save(record, query, valueRemoved);

        return result;
      });

      const result = await Promise.all(list);
      return result;
    } catch (error) {
      this.emitter.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.saveEntries',
        error
      } as ErrorEventData);
    }
  }
  @async_timer() async saveValue(value: QtValue, query: SaveQuery) {
    try {
      const parentId = query.id;
      const attributeName = query.relationName as string;
      const entityId = query.entityId;
      const relationSave = query.relationSave;

      if (!(parentId && attributeName)) {
        return null;
      }

      let entity: QtEntity;
      if (entityId) {
        entity = await this.entitySevice.getByName(entityId);
      } else {
        entity = await this.entitySevice.getByEntry(parentId);
      }

      const attr = entity.children.find((a) => a.name === attributeName);

      let existEntrys = value.children.filter((r) => !!r.id);
      let newEntries = value.children.filter((r) => !r.id);

      if (relationSave) {
        existEntrys = [];
        newEntries = value.children;
      }

      // saveEntries - соохраняем только новые записи
      if (newEntries.length) {
        // newEntries = await this.saveEntries(newEntries, query);
        const entityId = attr?.relation?.name;
        newEntries = await Promise.all(
          newEntries.map((record) => {
            return this.save(record, { ...query, entityId });
          })
        );
      }

      const newValue = await this.entitySevice.createValueAndSave({
        type: attr.type,
        parentId, // primary 1
        attributeName, // primary 2
        children: [newEntries, existEntrys].flat(),
        childrenProperty: value.childrenProperty
      });

      delete newValue.parent;
      clearEmty(newValue);
      return newValue;
    } catch (error) {
      this.emitter.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.saveRelation',
        error
      } as ErrorEventData);
    }
  }
  public async saveObject<T = IQtObject>(
    objValue: T,
    entity: QtEntity | string,
    query?: SaveQuery
  ) {
    try {
      if (typeof entity === 'string') {
        entity = await this.entitySevice.getByName(entity);
      }

      const values: QtValue[] = [];
      const keys = Object.keys(objValue);
      for (let i = 0; keys.length > i; i++) {
        const name = keys[i];
        const valueField = entity.children.find((c) => c.name === name);
        if (valueField) {
          const recordValue = createValueByField<QtValue>(valueField);
          const value = objValue[name];
          setEntryValueByObject(recordValue, value);
          values.push(recordValue);
        } else {
        }
      }

      const record = await this.entitySevice.createEntryByEntity(entity);

      record.children = values;
      // values.map(v => v.parent = record);

      // await this.save(record, query);
      await this.saveEntryAndValues(record, entity, query?.userId);
      // await this.recordRep.save(record);

      delete record.entity;
      return { entity, record };
    } catch (error) {
      this.emitter.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.saveObject',
        error
      } as ErrorEventData);
    }
  }
  private getFilterByAttributes(
    fields: DnFilterFields<any>,
    attributes: QtEntityAttribute[]
  ) {
    const relations: RelationAttribute = [];
    // const relationMany: RelationAttribute = [];
    const parents: RelationAttribute = [];
    const parentMany: RelationAttribute = [];
    const keyValues: RelationAttribute = [];

    Object.entries(fields).forEach(([attributeName, filterValue]) => {
      const attr = attributes.find((f) => f.name === attributeName);

      if (isRelation(attr.type)) {
        relations.push([attr, filterValue]);
      } else if (attr.type === EntityAttributeType.PARENT) {
        parents.push([attr, filterValue]);
      } else if (attr.type === EntityAttributeType.PARENT_MANY) {
        parentMany.push([attr, filterValue]);
      } else {
        keyValues.push([attr, filterValue]);
      }
    });

    // только родители
    const manyNull = parentMany.find(([, value]) => value === null);
    const parentNull = parentMany.find(([, value]) => value === null);

    if (!manyNull || !parentNull) {
      if (manyNull) {
        parentNull.push(manyNull);
      } else if (parentNull) {
        manyNull.push(parentNull);
      }
    }

    return { relations, parents, parentMany, keyValues, relationMany: [] };
  }

  public async remove(recordId: string, query?: UserQuery) {
    try {
      const { userId } = query;
      // this.deleteValueByParentId(recordId);
      const entity = await this.entitySevice.getByEntry(recordId);

      // проверяем есть ли у пользователя роль
      if (entity.roleable) {
        if (!(await this.roleSevice.hasRemove(userId, recordId))) {
          throw new HttpException('Not access', HttpStatus.BAD_REQUEST);
        }
      }

      const result = await this.recordRep.delete(recordId);
      this.emitter.emit(DS_REMOVE_RECORD, {
        recordId,
        entityName: entity.name
      } as ChangeEntryEventData);
      return result;
    } catch (error) {
      this.emitter.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.remove',
        error
      } as ErrorEventData);
    }
  }

  public async double(id: string, attributes: string[]) {
    try {
      const record = await this.fullEntryById(id).getOne();

      if (attributes?.length) {
        attributes.forEach((attributeName) => {
          const value: QtValue = record.children.find(
            (m) =>
              m.attribute?.name === attributeName || m.name === attributeName
          );

          if (value) {
            let attr = value.attribute;
            if (!attr) {
              attr = record.entity.children.find((f) => f.name === value.name);
            }

            if (isRelation(attr.type)) {
              const valueKey = VALUE_KEY_SET[EntityAttributeType.RELATION];
              const valueEntries: QtRecord[] = value[valueKey];
              if (Array.isArray(valueEntries)) {
                valueEntries.forEach((record) => {
                  delete record.id;

                  // record?.children.forEach((value) => delete value.id);
                });
              }
            }
          }
        });
      }

      const title = getValueByRole(record, EntityAttributeRole.TITLE);
      if (title) {
        setValueByRole(record, EntityAttributeRole.TITLE, `${title} clone`);
      } else {
        setValueByRole(record, EntityAttributeRole.TITLE, `Title`);
      }

      delete record.id;
      delete record.createdAt;
      delete record.updatedAt;

      record?.children?.forEach((val) => {
        delete val.createdAt;
        delete val.updatedAt;
      });

      // create
      const newEntry = await this.recordRep.save(record);
      const parents = record.parent;
      const entryChildId = newEntry.id;

      // update by parents
      if (parents?.length) {
        for (let i = 0; parents.length > i; i++) {
          const value = parents[i];

          const type = value.type;
          const attributeName = value.name;
          const valueParentId = value.parent.id;

          await this.entitySevice.addEntryByValue(type, attributeName, valueParentId, entryChildId);
        }
      }

      const valueEntries: QtRecord[] = [];

      // save parents
      newEntry.children.forEach((value) => {
        const _entries = value.children.filter((r) => !r.id);
        valueEntries.push(..._entries);
      });
      if (valueEntries.length) {
        await this.recordRep.save(valueEntries);
      }

      this.emitter.emit(DS_CREATE_RECORD, { entityName: newEntry.entity.id, recordId: newEntry.id } as ChangeEntryEventData);
      return newEntry;
    } catch (error) {
      this.emitter.emit(DS_ERROR_EVENT, { name: 'EntitySevice.double', error } as ErrorEventData);
    }
  }

  protected fullEntryById(id: string) {
    try {
      return (
        this.recordRep
          .createQueryBuilder('record')
          .leftJoinAndSelect('record.parent', 'parents') // ссылка на парент
          .leftJoinAndSelect('parents.parent', 'parent_parent') // ссылки на parent
          // .leftJoinAndSelect('record.parentMany', 'parentMany') // ссылка на родителей

          .leftJoinAndSelect('record.entity', 'entity') // ссылка на тип записи
          .leftJoinAndSelect('entity.children', 'attributes')

          .leftJoinAndSelect('record.children', 'entry_value')
          .leftJoinAndSelect('entry_value.attribute', 'field') // field

          .leftJoinAndSelect('entry_value.children', 'value_entry') // entries
          .leftJoinAndSelect('value_entry.entity', 'value_entry_entity') // field

          .leftJoinAndSelect('value_entry.children', 'value_entry_value')
          .leftJoinAndSelect('value_entry_value.attribute', 'value_entry_value_field') // field

          // .leftJoinAndSelect('record.resource', 'resource') // TODO(нужно потом добавить зависимости) зависимые записи
          .where('record.id=:recordId', { recordId: id })
      );
    } catch (error) {
      this.emitter.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.fullEntryById',
        error
      } as ErrorEventData);
    }
  }

  protected geResourceByValue(record: QtRecord | QtRecord[]) {
    try {
      const resource = [];
      if (Array.isArray(record)) {
        record.forEach((rec) => {
          resource.push(...this.geResourceByValue(rec));
        });
      } else {
        if (record && record.children) {
          record.children.forEach((rxValue) => {
            const valueKey = VALUE_KEY_SET[EntityAttributeType.JSON];
            try {
              if (rxValue.type === EntityAttributeType.JSON) {
                let json: IQtObject = rxValue[valueKey];
                if (typeof json === 'string') {
                  json = JSON.parse(rxValue[valueKey]);
                }

                resource.push(...getResource(json));
              }
            } catch (e) {
              rxValue[valueKey] = null;
              console.error('EntityAttributeType.JSON parse', e);
            }
          });
        }
      }

      function getResource(json: IQtObject | IQtObject[]): string[] {
        const result: string[] = [];
        if (Array.isArray(json)) {
          json.forEach((json) => {
            result.push(...getResource(json));
          });
        } else if (json && typeof json === 'object') {
          if (json.id) {
            result.push(json.id);
          }

          // propertyes
          Object.keys(json).forEach((key) => {
            const prop = json[key];
            if (Array.isArray(prop)) {
              result.push(...getResource(prop));
            } else if (prop && typeof prop === 'object') {
              if (prop.id) {
                result.push(prop.id);
              }
            }
          });
        }

        return result;
      }

      return [...new Set(resource)];
    } catch (error) {
      this.emitter.emit(DS_ERROR_EVENT, {
        name: 'EntitySevice.geResourceByValue',
        error
      } as ErrorEventData);
    }
  }

  @async_timer() protected async deleteValueByIds(ids: string[]) {
    return forkJoin([
      this.valueRep.delete(ids)
      //this.valueManyRep.delete(ids)
    ]);
  }

  protected toFlat(
    entries: (QtRecord | QtValue)[] | QtRecord,
    clearRelation = false
  ) {
    if (!Array.isArray(entries)) {
      entries = [entries];
    }

    const flatMap: (QtRecord | QtValue)[] = [];
    entries.forEach((record) => {
      flatMap.push(record);
      const children =
        record.children && record.children.length ? record.children : null;

      if (children) {
        const _children = this.toFlat(children, clearRelation);
        flatMap.push(..._children);
      }

      if (clearRelation) {
        delete record.parent;
        delete (record as any).parentMany;
        delete record.children;
      } else if (children) {
        // set parent
        children.forEach((child) => {
          // if (!child.id) {
          child.parent = record;
          // }
        });
      }
    });
    // flatMap.push(...entries);
    return flatMap;
  }
  /*
   * загружаем отношения(0 - уровень весь загружаем)
   */
  private async leftJoinByEntity(
    base: SelectQueryBuilder<any>,
    relation: QtLoadRelation | boolean,
    entity: Entity,
    recordAs = 'record',
    index = 0
  ) {
    if (typeof relation === 'object' && entity) {
      const attributes = entity.children;
      await this.leftJoinRelation({
        base,
        attributes,
        recordAs,
        relation,
        index
      });
    } else {
      this.leftJoinRelation({ base, attributes: [], recordAs, index });
    }
  }
  private async leftJoinRelation(params: {
    base: SelectQueryBuilder<any>;
    attributes: QtEntityAttribute[];
    recordAs: string;
    relation?: QtLoadRelation | boolean;
    index: number;
  }) {
    const { base, attributes, recordAs, relation } = params;
    let { index } = params;

    // первый уровень загружаем полностью
    const valueAs = `${recordAs}_v${index++}`;
    base.leftJoinAndSelect(`${recordAs}.children`, valueAs);

    const relations = attributes.filter((attr) => isRelation(attr.type));

    if (relations.length) {
      const _entryAs = `${valueAs}_${index++}`;
      base.leftJoinAndSelect(`${valueAs}.children`, _entryAs); //, `${valueAs}.name IN (:...relation_one)`, { relation_one: relation_one.map(a => a.name) });

      for (const attr of relations) {
        let entity;
        if (attr?.relation && relation[attr.name]) {
          entity = await this.entitySevice.getByName(attr.relation.name);
          await this.leftJoinByEntity(
            base,
            relation[attr.name],
            entity,
            _entryAs,
            index++
          );
        }
      }
    }
  }
  // добавляем фильтр по ролям
  protected _addWhereByRole(
    base: SelectQueryBuilder<any>,
    userId: string,
    recordAs: string = 'record'
  ) {
    const roles = [UserRoleSet.OWNER, UserRoleSet.READ, UserRoleSet.WRITE];

    function addWhereByRole(
      type: EntityAttributeType.PARENT | EntityAttributeType.PARENT_MANY
    ) {
      const query = base
        .subQuery()
        .select('record.id')
        .from(QtRecord, 'record')
        .leftJoin('record.roles', 'role')

        .leftJoin('role.user', 'user');

      query.leftJoin('record.parent', 'parent_value');

      query
        .leftJoin('parent_value.parent', 'parent_entry')
        .leftJoin('parent_entry.roles', 'role2')

        .leftJoin('role2.user', 'user2')

        .where(
          `role.name IN ('${roles.join(
            "','"
          )}') or role2.name IN ('${roles.join("','")}')`
        )
        .andWhere(`user.id=:userId or user2.id=:userId`, { userId });

      return query;
    }

    const queryParent = addWhereByRole(EntityAttributeType.PARENT).getQuery();
    const queryParentMany = addWhereByRole(
      EntityAttributeType.PARENT_MANY
    ).getQuery();

    base.andWhere(
      `(${recordAs}.id IN ${queryParent} or ${recordAs}.id IN ${queryParentMany})`
    );
  }

  protected _leftJoinParent(
    base: SelectQueryBuilder<QtRecord>,
    relation: QtLoadRelation,
    attributes: QtEntityAttribute[],
    recordAs = 'record'
  ) {
    const relations = Object.entries(relation || {});

    if (relations.length && attributes?.length) {
      // тут через parentField получаем
      const relationParent: string[] = [];

      relations.map(([attributeName, relationValue]) => {
        if (typeof relationValue === 'boolean') {
          const attr = attributes.find((f) => f.name === attributeName);

          if (attr) {
            const relationName = attr.relationName;
            if (
              [EntityAttributeType.PARENT, EntityAttributeType.PARENT_MANY].includes(
                attr.type
              )
            ) {
              relationParent.push(relationName);
            }
          } else {
            console.warn('Field parent not found', attributeName);
          }
        }
      });

      // делаем выборку только тех отношений которые запросили
      if (relationParent.length) {
        return base
          .leftJoinAndSelect(
            `${recordAs}.parent`,
            `${recordAs}parent_value_list`
          )
          .leftJoinAndSelect(
            `${recordAs}parent_value_list.parent`,
            `${recordAs}parent_entry_list`
          ) // record -> value
          .leftJoinAndSelect(
            `${recordAs}parent_entry_list.children`,
            `_${recordAs}parent_value_list`
          );
      }
    }
  }

  protected _filterByAttributes(
    base: SelectQueryBuilder<any>,
    fields: DnFilterFields<any>,
    attributes: QtEntityAttribute[]
  ) {
    if (fields && Object.keys(fields).length) {
      const { relations, relationMany, parents, parentMany, keyValues } =
        this.getFilterByAttributes(fields, attributes);

      const queryOne = this._filterOneQuery(base, {
        relations,
        parents,
        keyValues
      });
      if (queryOne) {
        base.andWhere(`record.id in ${queryOne}`);
      }

      const queryMany = this._filterManyQuery(base, {
        relationMany,
        parentMany
      });
      if (queryMany) {
        base.andWhere(`record.id in ${queryMany}`);
      }

      console.log('queryMany', queryMany);
    }
  }

  private _filterOneQuery(
    base: SelectQueryBuilder<any>,
    {
      relations,
      parents,
      keyValues
    }: {
      relations: RelationAttribute;
      parents: RelationAttribute;
      keyValues: RelationAttribute;
    }
  ) {
    if (
      relations.length === 0 &&
      parents.length === 0 &&
      keyValues.length === 0
    ) {
      return null;
    }

    const query = base
      .subQuery()
      .select('record.id')
      .from(QtValue, 'value')
      .leftJoin('value.parent', 'record'); // target

    if (relations.length) {
      query.leftJoin('value.children', 'child');
    }

    // parent
    if (parents.length) {
      query
        .leftJoin('record.parent', 'value_parent') // value
        .leftJoin('value_parent.parent', 'entry_value_parent'); // record

      parents.forEach(([attr, parentId]) => {
        if (parentId != null) {
          query.andWhere(`(entry_value_parent.id=:parentId)`, {
            parentId
          });
        } else {
          query.andWhere(`(value_parent.parent IS NULL)`);
        }
      });
    }

    // one
    relations.forEach(([attr, relationOneId]) => {
      query.andWhere('(child.id=:relationOneId)', { relationOneId });
    });

    // filter
    keyValues.forEach(([attr, filterValue]) => {
      const valueKey = VALUE_KEY_SET[attr.type];
      query.andWhere(`(value.${valueKey}=:filterValue)`, { filterValue });
    });

    return query.getQuery();
  }

  private _filterManyQuery(
    base: SelectQueryBuilder<any>,
    {
      relationMany,
      parentMany
    }: { relationMany: RelationAttribute; parentMany: RelationAttribute }
  ) {
    if (relationMany.length === 0 && parentMany.length === 0) {
      return null;
    }

    const query = base
      .subQuery()
      .select('record.id')
      .from(QtValue, 'value')
      .leftJoin('value.parent', 'record'); // target

    if (relationMany.length) {
      query.leftJoin('value.children', 'childEntry');
    }

    // parentMany
    if (parentMany.length) {
      query
        .leftJoin('record.parent', 'value_parent_many') // value
        .leftJoin('value_parent_many.parent', 'entry_value_parent_many'); // record

      // where
      parentMany.forEach(([attr, parentId]) => {
        if (parentId != null) {
          query.andWhere(`(entry_value_parent_many.id=:parentId)`, {
            parentId
          });
        } else {
          query.andWhere(`(value_parent_many.parent IS NULL)`);
        }
      });
    }

    // many
    relationMany.forEach(([attr, relationManyId]) => {
      query.andWhere('(childEntry.id=:relationManyId)', { relationManyId });
    });

    return query.getQuery();
  }

  private _addWhereBySearch(
    base: SelectQueryBuilder<any>,
    attributes: QtEntityAttribute[],
    attributeName: string,
    filterValue: string
  ) {
    let _base = base
      .subQuery()
      .select('record.id')
      .from(QtValue, 'value')
      .leftJoin('value.children', 'child')
      .leftJoin('value.parent', 'record');

    const attr = attributes.find((f) => f.name === attributeName);
    if (attr) {
      const valueKey = VALUE_KEY_SET[attr.type];
      _base = _base.andWhere(`(value.${valueKey} like :searchLike)`, {
        searchLike: `%${filterValue}%`
      });
    } else {
    }

    const recordIds = _base.getQuery();
    base.andWhere(`record.id in ${recordIds}`);
  }
}
