import { v4 } from 'uuid';
import { Prisma } from 'prisma/prisma-client';
import { PrismaService }  from 'src/prisma/prisma.service';
import {
  ATTRIBUTE_BOOLEAN,
  ATTRIBUTE_CREATED_AT,
  ATTRIBUTE_DATETIME,
  ATTRIBUTE_JSON,
  ATTRIBUTE_STRING,
  ATTRIBUTE_TEXTAREA,
  ATTRIBUTE_UPDATED_AT,
  ATTRIBUTE_ID
} from '@atlas/core/base';
import { EntityType } from '@metadb/model';

export async function createPageSeed(prisma: PrismaService) {
  const type = EntityType.PAGE;
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
      required: true,
      order: 0
    },
    {
      id: v4(),
      name: 'path',
      title: 'Path',
      type: ATTRIBUTE_STRING,
      required: true
    },
    {
      id: v4(),
      name: 'description',
      title: 'Description',
      type: ATTRIBUTE_TEXTAREA
    },
    {
      id: v4(),
      name: 'publish',
      title: 'Publish',
      type: ATTRIBUTE_BOOLEAN,
    },
    {
      id: v4(),
      name: 'visibility',
      title: 'Visibility',
      type: ATTRIBUTE_BOOLEAN,
    },
    {
      id: v4(),
      name: 'author',
      title: 'Author',
      type: ATTRIBUTE_STRING,
      readonly: true
    },
    {
      id: v4(),
      name: 'publishDate',
      title: 'Publish Date',
      type: ATTRIBUTE_DATETIME
    },
    // ProjectEntity
    {
      id: v4(),
      name: 'project',
      title: 'Project',
      type: ATTRIBUTE_STRING,
      readonly: true
    },
    // DsComponentContainer[]
    {
      id: v4(),
      name: 'children',
      title: 'Children',
      type: ATTRIBUTE_JSON
    },
    {
      id: v4(),
      name: 'createdAt',
      title: 'Created At',
      type: ATTRIBUTE_CREATED_AT,
      readonly: true
    },
    {
      id: v4(),
      name: 'updatedAt',
      title: 'Updated At',
      type: ATTRIBUTE_UPDATED_AT,
      readonly: true
    },
  ];

  // Save Entry Media
  return await prisma.entity.create({
    data: {
      name: 'page',
      title: 'Page',
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
