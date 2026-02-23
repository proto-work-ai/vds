import { v4 } from 'uuid';
import { Prisma } from 'prisma/prisma-client';
import { PrismaService }  from 'src/prisma/prisma.service';
import {
  ATTRIBUTE_BOOLEAN,
  ATTRIBUTE_PASSWORD,
  ATTRIBUTE_STRING,
  ATTRIBUTE_TOKEN,
  ATTRIBUTE_ID,
  ATTRIBUTE_CREATED_AT,
  ATTRIBUTE_UPDATED_AT,
  ATTRIBUTE_TEXTAREA,
  ATTRIBUTE_ONE_TO_MANY,
  ATTRIBUTE_JSON
} from '@atlas/core/base';
import { createTypeSeed } from 'src/record/createRecord';
import { EntityType } from '@metadb/model';

// async function createPermissionsSeed(prisma: PrismaService) {
//   const type = $Enums.EntityType.PERMISSION;
//   // Create User Attributes
//   const attributes: Prisma.AttributeCreateManyInput[] = [
//     {
//       id: v4(),
//       name: 'id',
//       title: 'Id',
//       type: ATTRIBUTE_ID
//     },
//     {
//       id: v4(),
//       title: 'Title',
//       name: 'title',
//       type: ATTRIBUTE_STRING,
//       required: true,
//       readonly: false
//     },
//     {
//       id: v4(),
//       title: 'Name',
//       name: 'name',
//       type: ATTRIBUTE_STRING,
//       required: true,
//       readonly: false
//     },
//     {
//       id: v4(),
//       name: 'description',
//       title: 'Description',
//       type: ATTRIBUTE_TEXTAREA,
//       readonly: false
//     }
//   ];

//   const permissions = [
//     {
//       title: 'Create',
//       name: 'create'
//     },
//     {
//       title: 'Read',
//       name: 'read'
//     },
//     {
//       title: 'Update',
//       name: 'update'
//     },
//     {
//       title: 'Delete',
//       name: 'delete'
//     },
//     {
//       title: 'Publish',
//       name: 'publish'
//     }
//   ];

//   return await createTypeSeed(
//     {
//       type,
//       title: 'Permission',
//       name: 'permission',
//       readonly: true,
//       attributes
//     },
//     permissions,
//     prisma
//   );
// }

async function createRoleSeed(prisma: PrismaService) {
  const type = EntityType.ROLE;

  const entity = await prisma.entity.findFirst({
    where: {
      type: type as any
    }
  });

  if (entity) {
    return entity;
  }

  // Create User Attributes
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
      readonly: false
    },
    {
      id: v4(),
      name: 'name',
      title: 'Name',
      type: ATTRIBUTE_STRING,
      required: true,
      readonly: false
    },
    {
      id: v4(),
      name: 'description',
      title: 'Description',
      type: ATTRIBUTE_TEXTAREA,
      readonly: false
    },
    {
      id: v4(),
      name: 'createdAt',
      title: 'Created At',
      type: ATTRIBUTE_CREATED_AT
    },
    {
      id: v4(),
      name: 'updatedAt',
      title: 'Updated At',
      type: ATTRIBUTE_UPDATED_AT
    },
    {
      id: v4(),
      title: 'Api Permission',
      name: 'permissions',
      type: ATTRIBUTE_JSON,
      readonly: false
    }
  ];

  const roles = [
    {
      title: 'Authenticated',
      name: 'authenticated'
    },
    {
      title: 'Public',
      name: 'public'
    }
  ];

  return await createTypeSeed(
    {
      type,
      title: 'Role',
      name: 'role',
      readonly: true,
      attributes
    },
    roles,
    prisma
  );
}

export async function createUserSeed(prisma: PrismaService) {
  const type = EntityType.USER;

  const entity = await prisma.entity.findFirst({
    where: {
      type: type as any
    }
  });

  if (entity) {
    return entity;
  }

  const role = await createRoleSeed(prisma);

  // Create User Attributes
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
      name: 'username',
      title: 'User Name',
      type: ATTRIBUTE_STRING,
      required: true
    },
    {
      id: v4(),
      name: 'email',
      title: 'Email',
      type: ATTRIBUTE_STRING,
      readonly: false,
      required: true
    },
    {
      id: v4(),
      title: 'Description',
      name: 'description',
      type: ATTRIBUTE_STRING,
      readonly: false
    },
    {
      id: v4(),
      name: 'password',
      title: 'Password',
      type: ATTRIBUTE_PASSWORD,
      readonly: true
    },
    {
      id: v4(),
      name: 'resetPasswordToken',
      title: 'Reset Password Token',
      type: ATTRIBUTE_TOKEN,
      readonly: true
    },
    {
      id: v4(),
      name: 'confirmationToken',
      title: 'Confirmation Token',
      type: ATTRIBUTE_TOKEN,
      readonly: true
    },
    {
      id: v4(),
      name: 'confirmed',
      title: 'Confirmed',
      type: ATTRIBUTE_BOOLEAN,
      readonly: true
    },
    {
      id: v4(),
      name: 'blocked',
      title: 'Blocked',
      type: ATTRIBUTE_BOOLEAN,
      readonly: true
    },
    {
      id: v4(),
      name: 'role',
      title: 'Role',
      type: ATTRIBUTE_ONE_TO_MANY,
      relationId: role.id,
      required: true
    },
    {
      id: v4(),
      name: 'updatedAt',
      title: 'Updated At',
      type: ATTRIBUTE_UPDATED_AT,
      readonly: true
    },
    {
      id: v4(),
      name: 'createdAt',
      title: 'Created At',
      type: ATTRIBUTE_CREATED_AT,
      readonly: true
    }
    // {
    //   id: v4(),
    //   name: 'provider',
    //   title: 'Provider',
    //   type: ATTRIBUTE_STRING,
    //   readonly: true
    // }
  ];

  // Save Entry User
  return await prisma.entity.create({
    data: {
      type: type as any,
      title: 'User',
      name: 'user',
      readonly: true,
      children: {
        createMany: {
          data: attributes
        }
      }
    }
  });
}
