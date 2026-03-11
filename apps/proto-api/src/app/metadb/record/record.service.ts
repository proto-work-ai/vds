/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { concatMap, lastValueFrom, merge } from 'rxjs';
import { validate as validateUuid } from 'uuid';
import { attributeRelationFilterOn, bindFieldWhere, EntityAttributeType, EntityType, FilterAndPagination, IRecord } from '@metadb/core';
import { MetaAttribute, MetaEntity, MetaRecord, PrismaClient } from '@metadb/client';
import { pagination } from 'prisma-extension-pagination';
import { PrismaService } from '@metadb/prisma';
import { getValuesForRecord } from './getValuesForRecord';
import { recordMap } from './recordMap';
import { PageNumberPagination } from 'prisma-extension-pagination/dist/types';
// import { FilterAndPagination, bindFieldWhere } from '@proto/ui/core';
// import { getValuesForRecord } from 'src/record/getValuesForRecord';
// import { recordMap } from 'src/record/recordMap';
// import { IRecord } from '@proto/ui/core/permission';
// import {
//   attributeRelationFilterOn,
//   EntityAttributeType
// } from '@atlas/core/base';
//import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecordService {
  private prismaPagination = this.prisma.$extends(pagination());
  private get record() {
    return this.prisma.metaRecord;
  }

  constructor(private prisma: PrismaService) {}

  async getAll(params: {
    limit: number,
    page: number,
  } = {
      limit: 10,
      page: 1,
    }): Promise<{ data: MetaRecord[], paginate: PageNumberPagination }> {
      return this.prismaPagination.metaRecord
      .paginate()
      .withPages({
        ...params,
        includePageCount: true
      }).then((result) => {
        const [data, paginate] = result;
        return { data, paginate };
      })
  }

  async create(
    entityId: string | EntityType,
    record: IRecord,
    attributes?: MetaAttribute[]
  ) {
    return this.createById(null, entityId, record, attributes);
  }

  async createById(
    recordId: string,
    entityId: string | EntityType,
    record: IRecord,
    attributes?: MetaAttribute[]
  ) {
    if (attributes == null) {
      const [entity1, attributes1] = await this.getAttributesByEntity(entityId);
      entityId = entity1.id;
      attributes = attributes1;
    }
    const values = getValuesForRecord(record, attributes);
    const entry = await this.prisma.metaRecord.create({
      data: {
        id: recordId ?? undefined,
        entityId,
        value: {
          createMany: {
            data: values
          }
        }
      }
    });

    await this.createValueRelation(entry.id, record, attributes);
    return entry;
  }

  async createMany(
    entityId: string | EntityType,
    records: Record<string, any>[],
    attributes?: MetaAttribute[]
  ) {
    return lastValueFrom(
      merge(records).pipe(
        concatMap((record) => {
          return this.create(entityId, record, attributes);
        })
      )
    );
  }

  async update(
    recordId: string | EntityType,
    record: IRecord,
    attributes?: MetaAttribute[]
  ) {
    if (attributes == null) {
      const [entity1, attributes1] = await this.getAttributesByEntry(recordId);
      attributes = attributes1;
    }

    const values = getValuesForRecord(record, attributes);

    const data = await Promise.all(
      values.map((val) => {
        return this.prisma.metaValue.upsert({
          where: {
            parentId_name: {
              parentId: recordId,
              name: val.name
            }
          },
          create: {
            parentId: recordId,
            ...val
          },
          update: val
        });
      })
    );

    await this.createValueRelation(recordId, record, attributes);
    return data;
  }

  async updateMany(
    recordId: string,
    records: Record<string, any>[],
    attributes?: MetaAttribute[]
  ) {
    return lastValueFrom(
      merge(records).pipe(
        concatMap((record) => {
          return this.update(recordId, record, attributes);
        })
      )
    );
  }

  private async createValueRelation(
    recordId: string,
    record: Record<string, any>,
    attributes: MetaAttribute[]
  ) {
    for (const attr of attributes.filter(attributeRelationFilterOn)) {
      const recordKey = attr.name;
      const value = record[recordKey];
      if (value != null) {
        const valueName = attr.name;
        const valueParentId = recordId;

        // Delete Of Exists
        await this.prisma.metaRecordRelation.deleteMany({
          where: {
            // recordId: connectId,
            valueName,
            valueParentId
          }
        });

        // Add Value Relation
        for (const val of Array.isArray(value) ? value : [value]) {
          const connectId = typeof val === 'string' ? val : val['id'];

          if (validateUuid(connectId)) {
            await this.prisma.metaRecordRelation.upsert({
              where: {
                valueParentId_valueName_recordId: {
                  recordId: connectId,
                  valueName: attr.name,
                  valueParentId: recordId
                }
              },
              create: {
                record: {
                  connect: {
                    id: connectId
                  }
                },
                value: {
                  connectOrCreate: {
                    where: {
                      parentId_name: {
                        name: attr.name,
                        parentId: recordId
                      }
                    },
                    create: {
                      name: attr.name,
                      parentId: recordId,
                      attributeId: attr.id
                    }
                  }
                }
              },
              update: {
                recordId: connectId,
                valueName,
                valueParentId
              }
            });
          } else {
            console.error('EntryService::create connectId', connectId);
          }
        }
      }
    }
  }

  async getById(recordId: string): Promise<Record<string, any>> {
    return this.record
      .findFirst({
        where: {
          id: recordId
        },
        include: {
          entity: {
            include: {
              children: {
                select: {
                  name: true,
                  type: true
                }
              }
            }
          },
          value: {
            include: {
              children: {
                include: {
                  record: {
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
      .then((entry) => {
        const record = {};

        // Simple Type Map
        entry.entity.children.forEach((attribute) => {
          const type = attribute.type as EntityAttributeType;
          // console.log('value.attribute', attribute);
          const recordKey = attribute.name;
          recordMap({
            record,
            recordKey,
            entry,
            type,
            values: entry.value
          });
        });

        // Relation Type Map
        entry.value.forEach((value) => {
          if (value?.children?.length) {
            const recordKey = value.name;
            const relationRecord = value.children.map((relation) => {
              const entry = relation.record;
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
  }

  getAttributesByEntity(
    entityId: string | EntityType
  ): Promise<[MetaEntity, MetaAttribute[]]> {
    if (validateUuid(entityId)) {
      return this.prisma.metaEntity
        .findFirst({
          where: {
            id: entityId
          },
          include: {
            children: true
          }
        })
        .then((entity) => {
          return [entity, entity.children];
        });
    } else {
      return this.prisma.metaEntity
        .findFirst({
          where: {
            type: {
              equals: entityId as any
            }
          },
          include: {
            children: true
          }
        })
        .then((entity) => {
          return [entity, entity.children];
        });
    }
  }

  private getAttributesByEntry(
    recordId: string
  ): Promise<[MetaEntity, MetaAttribute[]]> {
    return this.prisma.metaRecord
      .findFirst({
        where: {
          id: recordId
        },
        include: {
          entity: {
            include: {
              children: true
            }
          }
        }
      })
      .then((entry) => {
        return [entry.entity, entry.entity.children];
      });
  }

  async deleteById(id: string): Promise<MetaRecord> {
    return this.record.delete({
      where: { id }
    });
  }

  async find(type: EntityType, search: FilterAndPagination = {}): Promise<any> {
    return this.prisma.metaRecord
      .findFirstOrThrow({
        where: {
          entity: {
            type: type as any
          },
          ...bindFieldWhere(search?.filters)
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
                  record: {
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
      .then((entry) => {
        const data = [entry].map((entry) => {
          const record = {};
          // Simple Type Map
          entry.entity.children.forEach((attribute) => {
            if (!attribute.security) {
              const type = attribute.type as EntityAttributeType;
              const recordKey = attribute.name;
              recordMap({
                record,
                recordKey,
                entry,
                type,
                values: entry.value
              });
            }
          });

          // Relation Type Map
          entry.value.forEach((value) => {
            if (value?.children?.length) {
              const recordKey = value.name;
              const relationRecord = value.children.map((relation) => {
                const entry = relation.record;
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
      })
      .catch((e) => {
        console.error('find', e);
        return null;
      });
  }

  async getManyByEntity(entityId: string, search: FilterAndPagination = {}) {
    return this.getManyBy(entityId, null, search);
  }
  async getManyByType(type?: EntityType, search: FilterAndPagination = {}) {
    return this.getManyBy(null, type, search);
  }

  private async getManyBy(
    entityId: string,
    type?: EntityType,
    search: FilterAndPagination = {}
  ): Promise<any> {
    const whereByValue = bindFieldWhere(search?.filters);

    return this.prismaPagination.metaRecord
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
                  record: {
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
                const entry = relation.record;
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
}
