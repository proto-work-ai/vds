import { Injectable } from '@nestjs/common';
import { concatMap, lastValueFrom, merge } from 'rxjs';
import { validate as validateUuid } from 'uuid';
import { Attribute, Entity, Entry, PrismaClient } from '@prisma/client';
import { FilterAndPagination, bindFieldWhere } from '@proto/ui/core';
import { pagination } from 'prisma-extension-pagination';
import { getValuesForRecord } from 'src/record/getValuesForRecord';
import { recordMap } from 'src/record/recordMap';
import { IRecord } from '@proto/ui/core/permission';
import { EntityType } from '@metadb/model';
import {
  attributeRelationFilterOn,
  EntityAttributeType
} from '@atlas/core/base';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EntryService {
  private prismaPagination = new PrismaClient().$extends(pagination());
  private get delegate() {
    return this.prisma.entry;
  }

  constructor(private prisma: PrismaService) {}

  async getAll(type: EntityType): Promise<Entry[]> {
    return this.delegate.findMany({
      where: {
        entity: {
          type: type as any
        }
      }
    });
  }

  async create(
    entityId: string | EntityType,
    record: IRecord,
    attributes?: Attribute[]
  ) {
    return this.createById(null, entityId, record, attributes);
  }

  async createById(
    entryId: string,
    entityId: string | EntityType,
    record: IRecord,
    attributes?: Attribute[]
  ) {
    if (attributes == null) {
      const [entity1, attributes1] = await this.getAttributesByEntity(entityId);
      entityId = entity1.id;
      attributes = attributes1;
    }
    const values = getValuesForRecord(record, attributes);
    const entry = await this.prisma.entry.create({
      data: {
        id: entryId ?? undefined,
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
    attributes?: Attribute[]
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
    entryId: string | EntityType,
    record: IRecord,
    attributes?: Attribute[]
  ) {
    if (attributes == null) {
      const [entity1, attributes1] = await this.getAttributesByEntry(entryId);
      attributes = attributes1;
    }

    const values = getValuesForRecord(record, attributes);
    debugger;
    const data = await Promise.all(
      values.map((val) => {
        return this.prisma.value.upsert({
          where: {
            parentId_name: {
              parentId: entryId,
              name: val.name
            }
          },
          create: {
            parentId: entryId,
            ...val
          },
          update: val
        });
      })
    );

    await this.createValueRelation(entryId, record, attributes);
    return data;
  }

  async updateMany(
    entryId: string,
    records: Record<string, any>[],
    attributes?: Attribute[]
  ) {
    return lastValueFrom(
      merge(records).pipe(
        concatMap((record) => {
          return this.update(entryId, record, attributes);
        })
      )
    );
  }

  private async createValueRelation(
    entryId: string,
    record: Record<string, any>,
    attributes: Attribute[]
  ) {
    for (let attr of attributes.filter(attributeRelationFilterOn)) {
      const recordKey = attr.name;
      const value = record[recordKey];
      if (value != null) {
        const valueName = attr.name;
        const valueParentId = entryId;

        // Delete Of Exists
        await this.prisma.entryRelation.deleteMany({
          where: {
            // entryId: connectId,
            valueName,
            valueParentId
          }
        });

        // Add Value Relation
        for (let val of Array.isArray(value) ? value : [value]) {
          const connectId = typeof val === 'string' ? val : val['id'];
          debugger;
          if (validateUuid(connectId)) {
            await this.prisma.entryRelation.upsert({
              where: {
                valueParentId_valueName_entryId: {
                  entryId: connectId,
                  valueName: attr.name,
                  valueParentId: entryId
                }
              },
              create: {
                entry: {
                  connect: {
                    id: connectId
                  }
                },
                value: {
                  connectOrCreate: {
                    where: {
                      parentId_name: {
                        name: attr.name,
                        parentId: entryId
                      }
                    },
                    create: {
                      name: attr.name,
                      parentId: entryId,
                      attributeId: attr.id
                    }
                  }
                }
              },
              update: {
                entryId: connectId,
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

  async getById(entryId: string): Promise<Record<string, any>> {
    return this.delegate
      .findFirst({
        where: {
          id: entryId
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
  }

  getAttributesByEntity(
    entityId: string | EntityType
  ): Promise<[Entity, Attribute[]]> {
    debugger;
    if (validateUuid(entityId)) {
      return this.prisma.entity
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
      return this.prisma.entity
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
    entryId: string
  ): Promise<[Entity, Attribute[]]> {
    return this.prisma.entry
      .findFirst({
        where: {
          id: entryId
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

  async deleteById(id: string): Promise<Entry> {
    return this.delegate.delete({
      where: { id }
    });
  }

  async find(type: EntityType, search: FilterAndPagination = {}): Promise<any> {
    return this.prisma.entry
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
    // const prisma = new PrismaClient().$extends(pagination());

    const whereByValue = bindFieldWhere(search?.filters);

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
}
