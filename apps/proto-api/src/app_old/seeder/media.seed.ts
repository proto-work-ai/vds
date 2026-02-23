import { v4 } from 'uuid';
import { Prisma } from 'prisma/prisma-client';
import { PrismaService }  from 'src/prisma/prisma.service';
import {
  ATTRIBUTE_BOOLEAN,
  ATTRIBUTE_CREATED_AT,
  ATTRIBUTE_INT,
  ATTRIBUTE_NUMBER,
  ATTRIBUTE_STRING,
  ATTRIBUTE_TEXTAREA,
  ATTRIBUTE_ID
} from '@atlas/core/base';
import { EntityType } from '@metadb/model';

export async function createMediaSeed(prisma: PrismaService) {
  const type = EntityType.MEDIA;
  const mediaEntity = await prisma.entity.
  findFirst({
    where: {
      type: type as any
    }
  });

  if (mediaEntity) {
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
      name: 'name',
      title: 'File Name',
      type: ATTRIBUTE_STRING,
      required: true
    },
    {
      id: v4(),
      name: 'originalname',
      title: 'Original Name',
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
      name: 'extension',
      title: 'Extension',
      type: ATTRIBUTE_STRING,
      required: true
    },
    {
      id: v4(),
      title: 'Hash',
      name: 'hash',
      type: ATTRIBUTE_STRING,
      readonly: true
    },
    {
      id: v4(),
      name: 'encoding',
      title: 'Encoding',
      type: ATTRIBUTE_STRING,
      readonly: true
    },
    {
      id: v4(),
      name: 'size',
      title: 'Size',
      type: ATTRIBUTE_NUMBER,
      readonly: true
    },
    {
      id: v4(),
      name: 'path',
      title: 'Path',
      type: ATTRIBUTE_STRING,
      readonly: true,
      security: true,
    },
    {
      id: v4(),
      name: 'mimetype',
      title: 'Mimetype',
      type: ATTRIBUTE_STRING,
      readonly: true
    },
    {
      id: v4(),
      name: 'width',
      title: 'Width',
      type: ATTRIBUTE_INT,
      readonly: true
    },
    {
      id: v4(),
      name: 'height',
      title: 'Height',
      type: ATTRIBUTE_INT,
      readonly: true
    },
    {
      id: v4(),
      name: 'isImage',
      title: 'Is Image',
      type: ATTRIBUTE_BOOLEAN,
      required: false,
      readonly: true
    },
    {
      id: v4(),
      name: 'createdAt',
      title: 'Created At',
      type: ATTRIBUTE_CREATED_AT,
      readonly: true
    }
    // { id: v4(), name: 'type', title: 'Type', type: ATTRIBUTE_STRING },
  ];

  // Set Readonly
  // attributes.filter((a) => !a.required).forEach((a) => (a.readonly = true));

  // Save Entry Media
  return await prisma.entity.create({
    data: {
      name: 'media',
      title: 'Media',
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
