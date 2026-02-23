import { v4 } from 'uuid';
import { Prisma } from 'prisma/prisma-client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ATTRIBUTE_CREATED_AT,
  ATTRIBUTE_JSON,
  ATTRIBUTE_STRING,
  ATTRIBUTE_TEXTAREA,
  ATTRIBUTE_ID
} from '@atlas/core/base';
import { EntityType } from '@metadb/model';

export async function createComponentSeed(prisma: PrismaService) {
  const type = EntityType.COMPONENT;
  const entity = await prisma.entity.findFirst({
    where: {
      type: type as any
    }
  });

  if (entity) {
    return;
  }

  // Create Media Attribute
  const attributes: Prisma.AttributeCreateManyInput[] = [
    // Id
    {
      id: v4(),
      name: 'id',
      title: 'Id',
      type: ATTRIBUTE_ID,
      readonly: true
    },
    {
      id: v4(),
      name: 'title',
      title: 'Title',
      type: ATTRIBUTE_STRING,
      required: true
    },
    {
      id: v4(),
      name: 'category',
      title: 'Category',
      type: ATTRIBUTE_STRING,
      readonly: true
    },
    {
      id: v4(),
      name: 'type',
      title: 'Type',
      type: ATTRIBUTE_STRING,
      readonly: true
    },
    {
      id: v4(),
      name: 'description',
      title: 'Description',
      type: ATTRIBUTE_TEXTAREA
    },
    {
      id: v4(),
      name: 'createdAt',
      title: 'Created At',
      type: ATTRIBUTE_CREATED_AT,
      readonly: true
    },
    // ProjectEntity
    {
      id: v4(),
      name: 'project',
      title: 'Project',
      type: ATTRIBUTE_STRING,
      readonly: true
    },
    // DsElement[]
    {
      id: v4(),
      name: 'children',
      title: 'Children',
      type: ATTRIBUTE_JSON,
      readonly: true
    },
    // Record<string, { width: number; height: number; data: string }>
    {
      id: v4(),
      name: 'images',
      title: 'Images',
      type: ATTRIBUTE_JSON,
      readonly: true
    }
  ];

  // Save Entry Media
  return await prisma.entity.create({
    data: {
      name: 'component',
      title: 'Component',
      readonly: true,
      type: type as any,
      children: {
        createMany: {
          data: attributes
        }
      }
    }
  });
}
