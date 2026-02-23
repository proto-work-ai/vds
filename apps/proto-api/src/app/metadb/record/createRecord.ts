import { EntityType } from '@metadb/model';
import { Attribute, Entity, Prisma } from 'prisma/prisma-client';
import { concatMap, lastValueFrom, merge } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { getValuesForRecord } from 'src/record/getValuesForRecord';

export function createRecord(
  prisma: PrismaService,
  entityId: string,
  record: Record<string, any>,
  attributes?: MetaAttribute[],
) {
  return prisma.metaRecord.create({
    data: {
      entityId,
      value: {
        createMany: {
          data: getValuesForRecord(record, attributes as MetaAttribute[]),
        },
      },
    },
  });
}

async function createEntity(
  type: EntityType,
  attributes: Prisma.AttributeCreateManyInput[],
  prisma: PrismaService
) {
  const findEntity = await prisma.metaEntity.findFirst({
    where: {
      type: type as any
    },
    include: {
      children: true,
    },
  });

  if (findEntity) {
    return [];
  }

  // Save Entity
  const entity: MetaEntity = await prisma.metaEntity.create({
    data: {
      title: 'Permissions',
      name: 'permissions',
      readonly: true,
      type: type as any,
      children: {
        createMany: {
          data: attributes,
        },
      },
    },
  });

  return [entity, attributes] as [Entity, Attribute[]];
}

export function createRecords(
  prisma: PrismaService,
  entityId: string,
  records: Record<string, any>[],
  attributes?: MetaAttribute[],
) {
  if (records.length === 0) {
    return Promise.resolve();
  }
  return lastValueFrom(
    merge(records).pipe(
      concatMap((record) => {
        return prisma.metaRecord.create({
          data: {
            entityId,
            value: {
              createMany: {
                data: getValuesForRecord(record, attributes as MetaAttribute[]),
              },
            },
          },
        });
      }),
    ),
  );
}

export interface EntityCreateInput {
  type: EntityType;
  title: string;
  name: string;
  readonly: boolean;
}

export async function createTypeSeed(
  {
    type,
    name,
    readonly,
    title,
    attributes,
  }: EntityCreateInput & { attributes: Prisma.AttributeCreateManyInput[] },
  records: Record<string, any>[],
  prisma: PrismaService
) {
  let entity = await prisma.entity.findFirst({
    where: {
      type: type as any
    }
  });

  if (entity) {
    return entity;
  }

  // Save Entity
  entity = await prisma.entity.create({
    data: {
      title,
      name,
      readonly,
      type: type as any,
      children: {
        createMany: {
          data: attributes
        }
      }
    }
  });

  // Create Read Update Delete Publish

  await createRecords(prisma, entity.id, records, attributes as Attribute[]);

  return entity;
}
