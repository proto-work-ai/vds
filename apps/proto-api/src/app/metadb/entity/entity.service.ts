/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { concatMap, lastValueFrom, merge } from 'rxjs';
import { EntityType } from '@metadb/core';
import { MetaEntity } from '@metadb/client';
import { PrismaService } from '@metadb/prisma';
import { pagination } from 'prisma-extension-pagination';
import { PageNumberPagination } from 'prisma-extension-pagination/dist/types';

@Injectable()
export class MetaEntityService {
  private prismaPagination = this.prisma.$extends(pagination());
  private get entity() {
    return this.prisma.metaEntity;
  }

  constructor(private prisma: PrismaService) { }

  async getAll(params: {
    limit: number,
    page: number,
  } = {
      limit: 10,
      page: 1,
    }): Promise<{ data: MetaEntity[], paginate: PageNumberPagination }> {
      return this.prismaPagination.metaEntity
      .paginate()
      .withPages({
        ...params,
        includePageCount: true
      }).then((result) => {
        const [data, paginate] = result;
        return { data, paginate };
      })
  }

  async getById(id: string): Promise<MetaEntity> {
    return this.entity
      .findUnique({
        where: { id },
      })
      .then((entity) => {
        // TODO удалить(readonly)
        entity = { ...entity };
        entity.readonly = false;
        return entity;
      });
  }

  async getByType(type: EntityType): Promise<MetaEntity> {
    return this.prisma.metaEntity
      .findFirst({
        where: {
          type: type as any,
        },
      })
      .then((entity) => {
        // TODO удалить(readonly)
        entity = { ...entity };
        entity.readonly = false;
        return entity;
      });
  }

  async create(data: MetaEntity): Promise<MetaEntity> {
    return this.entity.create({
      data: {
        title: data.title,
        name: data.name,
        description: data.description,
        readonly: data.readonly,
        disable: data.disable,
      },
    });
  }

  async update(id: string, data: MetaEntity): Promise<MetaEntity> {
    return this.entity.update({
      where: { id },
      data: {
        title: data.title,
        name: data.name,
        description: data.description,
        readonly: data.readonly,
        disable: data.disable,
        order: data.order,
      }
    });
  }

  async deleteById(entityId: string, andRecords = true): Promise<MetaEntity> {
    if (andRecords) {
      const records = await this.prisma.metaRecord.findMany({
        where: {
          entityId,
        },
        select: {
          id: true,
        },
      });

      if (records.length) {
        await lastValueFrom(
          merge(records).pipe(
            concatMap((a) => {
              return this.prisma.metaRecord.delete({
                where: { id: a.id },
              });
            }),
          ),
        );
      }
    }

    return this.entity.delete({
      where: { id: entityId },
    });
  }
}

/*
  private async getManyBy(
    entityId: string,
    type?: EntityType,
    search: FilterAndPagination = {}
  ): Promise<any> {
    // const whereByValue = bindFieldWhere(search?.filters);

    return this.prismaPagination.entry
      .paginate({
        where: {
          OR: [
            { entityId },
            {
              entity: {
                type: type as any
              }
            }
          ],
          ...whereByValue
        },
        include: {
          entity: {
            include: {
              children: {
                select: {
                  name: true,
                  type: true,
                  security: true
                }
              }
            }
          },
          value: {
            include: {
              children: {
                include: {
                  entry: {
                    include: {
                      value: true,
                      entity: {
                        include: {
                          children: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      })
      .withPages({
        limit: 20,
        page: 1,
        includePageCount: true,
        ...search.pagination
      })
      .then((result) => {
        const [entries, pagination] = result;
        const data = entries.map((entry) => {
          const record = {};
          // Simple Type Map
          entry.entity.children
            .filter((a) => !a.security)
            .forEach((attribute) => {
              const type = attribute.type as EntityAttributeType;
              const recordKey = attribute.name;
              const values = entry.value;
              recordMap({
                record,
                recordKey,
                entry,
                type,
                values
              });
            });

          // Relation Type Map
          entry.value.forEach((value) => {
            if (value?.children?.length) {
              const recordKey = value.name;
              const relationRecord = value.children.map((relation) => {
                const entry = relation.entry;
                const childRecord = {};
                entry.entity.children
                  .filter((a) => !a.security)
                  .forEach((attribute) => {
                    const type = attribute.type as EntityAttributeType;
                    const recordKey = attribute.name;
                    const values = entry.value;
                    recordMap({
                      record: childRecord,
                      recordKey,
                      entry,
                      type,
                      values
                    });
                  });
                return childRecord;
              });
              record[recordKey] = relationRecord;
            }
          });
          return record;
        });

        return { data, pagination };
      });
  }
*/
