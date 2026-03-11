export type IRecord = Record<string, any>;

export const EntityType  = {
  COMPONENT: 'COMPONENT',
  MEDIA: 'MEDIA',
  PAGE: 'PAGE',
  USER: 'USER',
  ROLE: 'ROLE',
  USER_ADMIN: 'USER_ADMIN',
  ROLE_ENTITY: 'ROLE_ENTITY'
};

export type EntityType = (typeof EntityType)[keyof typeof EntityType]

export class IUser {
  id?: string;
  username?: string;
  email?: string;
  description?: string;
  provider?: string;
  password?: string;
  resetPasswordToken?: string;
  confirmationToken?: string;
  confirmed?: string;
  blocked?: string;
  role?: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class IRole {
  id?: string;
  title?: string;
  name?: string;
  description?: string;
  entityPermissions?: IRolePermission[];

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

/*
  $Enums.EntityType.ROLE_ENTITY
*/
export class IRoleEntity {
  id?: string;
  title?: string;
  name?: string;
  description?: string;
  permissions?: IRolePermission[];

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class IRolePermission {
  id?: string;
  name!: PermissionEntityKey | string;
  ids!: string[];
}

export type PermissionEntityKey =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'publish';

export const ENTITY_PERMISSIONS: {
  title: string;
  name: PermissionEntityKey;
}[] = [
  { title: 'Create', name: 'create' },
  { title: 'Read', name: 'read' },
  { title: 'Update', name: 'update' },
  { title: 'Delete', name: 'delete' },
  { title: 'Publish', name: 'publish' }
];

export type PermissionApiKey =
  | 'create'
  | 'delete'
  | 'find'
  | 'findOne'
  | 'update';

export const API_PERMISSIONS: {
  title: string;
  name: PermissionApiKey;
  method: string;
  params: string;
}[] = [
  { title: 'Create', name: 'create', method: 'post', params: '' },
  { title: 'Update', name: 'update', method: 'put', params: ':id' },
  { title: 'Find', name: 'find', method: 'get', params: '' },
  { title: 'Find One', name: 'findOne', method: 'get', params: ':id' },
  { title: 'Delete', name: 'delete', method: 'delete', params: ':id' }
];
