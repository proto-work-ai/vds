/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { EntityAttributeType } from './base';

export interface IMetaDbEntity {
  id?: string;
  title?: string;
  name?: string;
  // order?: number;
  // roleable?: boolean;
  // roles?: QtRoleEntity[]
  entries?: IMetaDbRecord[];
  children?: IMetaDbAttribute[];
}

export interface IMetaDbAttribute {
  title?: string;
  name?: string;

  multiple?: boolean;

  relation?: IMetaDbEntity;
  relationName?: string; // название поля(Entity:name)
  relationMultiple?: boolean;

  relationOrder?: string; // название поля для сортировки в relation
  relationOrderBy?: 'ASK' | 'DESK'; // направление сортировки по умолчанию(ask)

  value?: any; // значение
  default?: any; // значение по умолчанию(если value == null)

  help?: string;
  description?: string;

  hidden?: boolean; // поле по умолчанию показывается
  required?: boolean;
  clearable?: boolean;
  disable?: boolean;

  order?: number;
  security?: boolean; // поле обрабатывается только на сервере

  hash?: 'password' | string; // хешировать или не хешировать(название хеширования)

  type?: EntityAttributeType;
  // role?: EntityAttributeRole;
  // field?: FormField;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMetaDbValue {
  bit?: boolean;
  // TRUE преобразуется в 1, а FALSE — в 0
  tinyint?: number;
  // От 0 до 255 (1 байт)
  smallint?: number;
  // от -2^15 (-32 768) до 2^15-1 (32 767)	2 байта
  int?: number;
  // от -2^31 (-2 147 483 648) до 2^31-1 (2 147 483 647)	4 байта
  bigint?: number;
  // # Приблизительные числа
  float?: number;
  // # Дата и время
  date?: string;
  // ГГГГ-ММ-ДД  От 1 января 1 года до 31 декабря 9999 года нашей эры (от 15 октября 1582 года до 31 декабря 9999 года для Informatica).
  datetime?: string;
  // Значение по умолчанию	1900-01-01 00:00:00
  time?: string;
  // # Символьные строки
  nvarchar?: string;
  // Строковые данные фиксированного размера. n определяет размер строки в парах байтов и должно иметь значение от 1 до 4000
  ntext?: string;
  // # Двоичные данные
  varbinary?: string;
  // Данные в столбце значительно различаются по размеру.
  image?: string;
  //  0 до 2^31 – 1 (2 147 483 647) байт.
  createdAt?: Date;
  // Юникод с максимальной длиной строки 2^30 - 1 (1 073 741 823) байт
  updatedAt?: Date;
  // состояние внутренних объектов()

  // от -2^63 (-9 223 372 036 854 775 808) до 2^63-1 (9 223 372 036 854 775 807)	8 байт
  // 25-53	15 знаков	8 байт
  // ч:мм:сс[.ннннннн] для Informatica) От 00:00:00.0000000 до 23:59:59.9999999
}

export class IMetaDbValue {
  id?: string; // используется в формах
  name?: string; // primary 1
  parent?: IMetaDbRecord; // primary 2

  type?: EntityAttributeType;
  attribute?: IMetaDbAttribute;

  children?: IMetaDbRecord[]; // => record
  // childrenProperty?: PropertyMap; // состояние внутренних объектов()

  value?: any;
  constructor(object?: IMetaDbValue) {
    if (object) {
      Object.assign(this, object);
    }
  }
}

export class IMetaDbRecord {
  id?: string;

  parent?: IMetaDbValue[];

  // parentMany?: IValue[];

  entity?: IMetaDbEntity; // => record

  children?: IMetaDbValue[]; // => relation

  // childrenMany?: IValue[]; // => relationMany
  // fieldName?: string;

  createdAt?: Date;

  updatedAt?: Date;

  constructor(object: IMetaDbRecord) {
    Object.assign(this, object);
  }
}
