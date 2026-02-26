/* eslint-disable @nx/enforce-module-boundaries */
import { EntityType } from '@metadb/model';
import {
  MetaAttribute,
  MetaEntity,
  Prisma,
} from '@metadb/client';
import { concatMap, lastValueFrom, merge } from 'rxjs';
import { getValuesForRecord } from './getValuesForRecord';
import { PrismaService } from '@metadb/prisma';

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
  attributes: Prisma.MetaAttributeCreateManyInput[],
  prisma: PrismaService,
) {
  const findEntity = await prisma.metaEntity.findFirst({
    where: {
      type: type as any,
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

  return [entity, attributes] as [MetaEntity, MetaAttribute[]];
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
  }: EntityCreateInput & { attributes: Prisma.MetaAttributeCreateManyInput[] },
  records: Record<string, any>[],
  prisma: PrismaService,
) {
  let entity = await prisma.metaEntity.findFirst({
    where: {
      type: type as any,
    },
  });

  if (entity) {
    return entity;
  }

  // Save Entity
  entity = await prisma.metaEntity.create({
    data: {
      title,
      name,
      readonly,
      type: type as any,
      children: {
        createMany: {
          data: attributes,
        },
      },
    },
  });

  // Create Read Update Delete Publish

  await createRecords(prisma, entity.id, records, attributes as MetaAttribute[]);

  return entity;
}
