export const FIELD_TEXT = 'text';
export const FIELD_TEXTAREA = 'textarea';
export const FIELD_RICHTEXT = 'richtext';
export const FIELD_CHECKBOX = 'checkbox';

export const FIELD_RADIO = 'radio';
// export const FIELD_RANGE = 'range';
export const FIELD_SELECT = 'select';

export const FIELD_DATE = 'date';
export const FIELD_DATE_RANGE = 'date-range';
export const FIELD_DATETIME = 'datetime';

export const FIELD_NUMBER = 'number';
export const FIELD_NUMBER_RANGE = 'number-range';

export const FIELD_COLOR = 'color';
export const FIELD_PALETTE = 'palette';

export const FIELD_MEDIA = 'media';
export const FIELD_RANGE = 'range';
export const FIELD_CUSTOM = 'custom';

//export const FIELD_ONE_TO_ONE = 'one_to_one';
//export const FIELD_ONE_TO_MANY = 'one_to_many';

export const FIELD_SEARCH = 'search';

export type FieldType =
  //| typeof FIELD_ONE_TO_ONE
  //| typeof FIELD_ONE_TO_MANY

  | typeof FIELD_SEARCH
  | typeof FIELD_TEXT
  | typeof FIELD_TEXTAREA
  | typeof FIELD_RICHTEXT
  | typeof FIELD_CHECKBOX
  | typeof FIELD_RADIO
  | typeof FIELD_SELECT
  | typeof FIELD_DATE
  | typeof FIELD_DATETIME
  | typeof FIELD_DATE_RANGE
  | typeof FIELD_NUMBER
  | typeof FIELD_NUMBER_RANGE
  | typeof FIELD_RANGE
  | typeof FIELD_MEDIA
  | typeof FIELD_COLOR
  | typeof FIELD_PALETTE
  | typeof FIELD_CUSTOM;

export enum FieldTypeEnum {
  RANGE = FIELD_RANGE,
  TEXT = FIELD_TEXT,
  TEXTAREA = FIELD_TEXTAREA,
  RICHTEXT = FIELD_RICHTEXT,
  CHECKBOX = FIELD_CHECKBOX,
  RADIO = FIELD_RADIO,
  // RANGE= typeof FIELD_RANGE;
  SELECT = FIELD_SELECT,

  DATE = FIELD_DATE,
  DATETIME = FIELD_DATETIME,
  DATE_RANGE = FIELD_DATE_RANGE,

  NUMBER = FIELD_NUMBER,
  NUMBER_RANGE = FIELD_NUMBER_RANGE,

  MEDIA = FIELD_MEDIA,
  COLOR = FIELD_COLOR,
  PALETTE = FIELD_PALETTE,
  CUSTOM = FIELD_CUSTOM,
  SEARCH = FIELD_SEARCH
}

// export enum FieldTypeEnum {
//   TEXT = FIELD_TEXT,
//   TEXTAREA = FIELD_TEXTAREA,
//   RICHTEXT = FIELD_RICHTEXT,

//   CHECKBOX = FIELD_CHECKBOX,
//   RADIO = FIELD_RADIO,

//   SELECT = FIELD_SELECT,
//   DATE = FIELD_DATE,
//   COLOR = FIELD_COLOR,
//   NUMBER = FIELD_NUMBER,
//   IMAGE = FIELD_MEDIA,
//   PALETTE = FIELD_PALETTE,
//   CUSTOM = FIELD_CUSTOM,
//   RANGE = 'range',
//   FILE = 'file'
// }

export class IQtObject {
  id?: string;
  [key: string]: any;
}

export interface QtExpression {
  expression: any;
  condition: 'and' | 'or';
}

export enum EntityAttributeRole {
  NAME,
  VALUE,
  TITLE,
  SUB_TITLE,
  DESCRIPTION,

  // meta
  ID,
  OBJECT_ID, // (автозаполняемый) id обекта он нужден чтобы при cвязывать сотояние обекта, так как recordId может не существовать
  CREATE_DATE, // дата создания
  UPDATE_DATE, // дата последнего обновления(получается из даты последнего обновления значения => EntryValue)
  PROPERTY, // данные элемента работают только когда элемент добавлен(EntryValue => {id, option})
  VERSION // версия записи(создается список версия элемента, это групировка)
}

export enum QtRoleEntity {
  PROPERTY
}

// Sytem Attribute
export const ATTRIBUTE_ENTITY = 'ATTRIBUTE_ENTITY'; // Список всех сущностей
export const ATTRIBUTE_ENTRY = 'ATTRIBUTE_ENTRY'; // Список всех записей
export const ATTRIBUTE_VALUE = 'ATTRIBUTE_VALUE'; // Список всех значений
export const ATTRIBUTE_ATTRIBUTE = 'ATTRIBUTE_ATTRIBUTE'; // Список всех аттрибутов

// Можно выбрать не сколько значений
export const ATTRIBUTE_SELECT = 'SELECT';

export const ATTRIBUTE_ONE_TO_ONE = 'ONE_TO_ONE';
export const ATTRIBUTE_ONE_TO_MANY = 'ONE_TO_MANY';
export const ATTRIBUTE_MANY_TO_MANY = 'MANY_TO_MANY';

/*
  https://www.baeldung.com/sql/mysql-store-images#:~:text=We%20generally%20store%20images%20in%20MySQL%20as%20BLOB%20datatype.&text=BLOB%20(maximum%20of%2065%2C535%20bytes,LONGBLOB%20(maximum%20of%204%2C294%2C967%2C295%20bytes)
  VARBINARY (maximum 255 bytes; хранится в строке)  TINYBLOB (maximum of 255 bytes; хранятся во вторичном хранилище)
  BLOB(!) (maximum of 65,535 bytes; хранятся во вторичном хранилище)
  MEDIUMBLOB (maximum of 16,777,215 bytes; хранятся во вторичном хранилище)
  LONGBLOB (maximum of 4,294,967,295 bytes; хранятся во вторичном хранилище)
*/
export const ATTRIBUTE_MEDIA = 'MEDIA';
export const ATTRIBUTE_MEMO = 'MEMO';

export const ATTRIBUTE_STRING = 'STRING';
export const ATTRIBUTE_TEXTAREA = 'TEXTAREA';
export const ATTRIBUTE_RICHTEXT = 'RICHTEXT';
export const ATTRIBUTE_JSON = 'JSON';

// Date and Time
export const ATTRIBUTE_TIME = 'TIME'; // '00:00:00'
export const ATTRIBUTE_YEAR = 'YEAR'; // 0000
export const ATTRIBUTE_DATE = 'DATE'; // '0000-00-00'
export const ATTRIBUTE_DATE_RANGE = 'DATE_RANGE'; // '0000-00-00' - '0000-00-00'
export const ATTRIBUTE_DATETIME = 'DATETIME'; // '0000-00-00 00:00:00'

// Special
export const ATTRIBUTE_ID = 'UUID'; // insert Entry Id
export const ATTRIBUTE_UPDATED_AT = 'DATE_UPDATED_AT'; // insert Updated At
export const ATTRIBUTE_CREATED_AT = 'DATE_CREATED_AT'; // insert Created At
export const ATTRIBUTE_PASSWORD = 'PASSWORD';
export const ATTRIBUTE_TOKEN = 'TOKEN';
export const ATTRIBUTE_RELATION_COUNT = 'RELATION_COUNT'; // Количество элементов в отношении

export const ATTRIBUTE_BOOLEAN = 'BOOLEAN';

export const ATTRIBUTE_TINYINT = 'TINYINT';
export const ATTRIBUTE_SMALLINT = 'SMALLINT';
export const ATTRIBUTE_INT = 'INT';
export const ATTRIBUTE_BIGINT = 'BIGINT';
export const ATTRIBUTE_NUMBER = 'NUMBER';
export const ATTRIBUTE_NUMBER_RANGE = 'NUMBER_RANGE';

// Нужно описание
export const ATTRIBUTE_PARENT = 'PARENT';
export const ATTRIBUTE_PARENT_MANY = 'PARENT_MANY';

//export const ATTRIBUTE_RELATION = 'relation';

export type CollectionAttributeType =
  | typeof ATTRIBUTE_ONE_TO_ONE
  | typeof ATTRIBUTE_ONE_TO_MANY
  | typeof ATTRIBUTE_MANY_TO_MANY
  | typeof ATTRIBUTE_STRING
  | typeof ATTRIBUTE_TEXTAREA
  | typeof ATTRIBUTE_RICHTEXT
  | typeof ATTRIBUTE_BOOLEAN
  | typeof ATTRIBUTE_MEDIA
  | typeof ATTRIBUTE_JSON
  | typeof ATTRIBUTE_TIME
  | typeof ATTRIBUTE_DATE
  | typeof ATTRIBUTE_DATE_RANGE
  | typeof ATTRIBUTE_DATETIME
  | typeof ATTRIBUTE_TINYINT
  | typeof ATTRIBUTE_SMALLINT
  | typeof ATTRIBUTE_INT
  | typeof ATTRIBUTE_NUMBER
  | typeof ATTRIBUTE_NUMBER_RANGE
  | typeof ATTRIBUTE_BIGINT

  // Special
  | typeof ATTRIBUTE_TOKEN
  | typeof ATTRIBUTE_PASSWORD
  | typeof ATTRIBUTE_UPDATED_AT
  | typeof ATTRIBUTE_CREATED_AT
  | typeof ATTRIBUTE_ID
  //| typeof ATTRIBUTE_RELATION
  | typeof ATTRIBUTE_RELATION_COUNT;

export enum EntityAttributeType {
  ONE_TO_ONE = ATTRIBUTE_ONE_TO_ONE,
  ONE_TO_MANY = ATTRIBUTE_ONE_TO_MANY,
  MANY_TO_MANY = ATTRIBUTE_MANY_TO_MANY,

  BOOLEAN = ATTRIBUTE_BOOLEAN,

  TINYINT = ATTRIBUTE_TINYINT,
  SMALLINT = ATTRIBUTE_SMALLINT,
  INT = ATTRIBUTE_INT,
  BIGINT = ATTRIBUTE_BIGINT,
  FLOAT = ATTRIBUTE_NUMBER,
  NUMBER_RANGE = ATTRIBUTE_NUMBER_RANGE,

  TIME = ATTRIBUTE_TIME,
  DATE = ATTRIBUTE_DATE, // 00.00.00
  DATETIME = ATTRIBUTE_DATETIME, // 00.00.00 00:00:00
  DATE_RANGE = ATTRIBUTE_DATE_RANGE,

  STRING = ATTRIBUTE_STRING,
  TEXTAREA = ATTRIBUTE_TEXTAREA,
  MEMO = ATTRIBUTE_MEMO,

  MEDIA = ATTRIBUTE_MEDIA,

  SELECT = ATTRIBUTE_SELECT,
  JSON = ATTRIBUTE_JSON,

  PARENT = ATTRIBUTE_PARENT, // псевдо
  PARENT_MANY = ATTRIBUTE_PARENT_MANY, // псевдо

  PARENT_COUNT = 'PARENT_COUNT', // когда надо получить количесво элементов в отношениие

  // SPECIFICITY_SPECIAL
  UUID = ATTRIBUTE_ID,
  PASSWORD = ATTRIBUTE_PASSWORD,
  TOKEN = ATTRIBUTE_TOKEN,
  UPDATED_AT = ATTRIBUTE_UPDATED_AT,
  CREATED_AT = ATTRIBUTE_CREATED_AT,
  RELATION_COUNT = ATTRIBUTE_RELATION_COUNT
}

export const isRelation = (type: EntityAttributeType) =>
  [EntityAttributeType.ONE_TO_ONE, EntityAttributeType.ONE_TO_MANY].includes(
    type
  );

export const isParentRelation = (type: EntityAttributeType) =>
  [EntityAttributeType.PARENT, EntityAttributeType.PARENT_MANY].includes(type);

export const isManyRelation = (_type: EntityAttributeType) => true; // всегда мани [EntityAttributeType.RELATION_MANY, EntityAttributeType.PARENT_MANY].includes(type);

export const VALUE_KEY_SET: Partial<Record<EntityAttributeType, any>> = {
  // EntityAttributeType.TREE]: 'children',
  [EntityAttributeType.BOOLEAN]: 'bit',

  [EntityAttributeType.TINYINT]: 'tinyint',
  [EntityAttributeType.SMALLINT]: 'smallint',
  [EntityAttributeType.INT]: 'int',
  [EntityAttributeType.BIGINT]: 'bigint',
  [EntityAttributeType.FLOAT]: 'float',

  [EntityAttributeType.TIME]: 'time',
  [EntityAttributeType.DATE]: 'date',
  [EntityAttributeType.DATETIME]: 'datetime',

  [EntityAttributeType.STRING]: 'varchar',
  [EntityAttributeType.TEXTAREA]: 'text',
  [EntityAttributeType.MEMO]: 'text',
  [EntityAttributeType.JSON]: 'json',
  [EntityAttributeType.MEDIA]: 'blob',
  [EntityAttributeType.PARENT]: '@p',
  [EntityAttributeType.PARENT_MANY]: '@pm',

  [EntityAttributeType.PASSWORD]: undefined,
  [EntityAttributeType.NUMBER_RANGE]: undefined,
  [EntityAttributeType.DATE_RANGE]: undefined,
  [EntityAttributeType.SELECT]: undefined,
  [EntityAttributeType.PARENT_COUNT]: undefined,

  [EntityAttributeType.ONE_TO_ONE]: 'children',
  [EntityAttributeType.ONE_TO_MANY]: 'children',
  [EntityAttributeType.MANY_TO_MANY]: 'children'
};

export interface IQtFieldOption {
  mask?: any;
  prefix?: string;
  suffix?: string;

  help?: string;
  min?: number;
  max?: number;
  pattern?: string;
}

export declare type PropertyMap = { [key: string]: IQtObject[] };

export const ATTRIBUTE_SPECIFICITY_SYSTEM = [];

export const ATTRIBUTE_SPECIFICITY_SPECIAL = [
  ATTRIBUTE_ID,
  ATTRIBUTE_TOKEN,
  ATTRIBUTE_PASSWORD,
  ATTRIBUTE_RELATION_COUNT
  // ATTRIBUTE_UPDATED_AT,
  // ATTRIBUTE_CREATED_AT,
];

// Эти поля не редактируются и сохранять их нельзя
export const ATTRIBUTE_VIEW_ONLY = [
  ...ATTRIBUTE_SPECIFICITY_SPECIAL,
  ATTRIBUTE_UPDATED_AT,
  ATTRIBUTE_CREATED_AT
];

export const ATTRIBUTE_RELATIONS = [
  ATTRIBUTE_ONE_TO_ONE,
  ATTRIBUTE_ONE_TO_MANY,
  ATTRIBUTE_MANY_TO_MANY
];

export function attributeViewFilterExcept(attribute: {
  type: string | EntityAttributeType;
}): boolean {
  const type = attribute.type as EntityAttributeType;
  return !ATTRIBUTE_VIEW_ONLY.includes(type);
}

export function attributeSpecificityFilterExcept(attribute: {
  type: string | EntityAttributeType;
}): boolean {
  const type = attribute.type as EntityAttributeType;
  return !ATTRIBUTE_SPECIFICITY_SPECIAL.includes(type);
}

export function attributeRelationFilterExcept(attribute: {
  type: string | EntityAttributeType;
}): boolean {
  const type = attribute.type as EntityAttributeType;
  return !ATTRIBUTE_RELATIONS.includes(type);
}

export function attributeRelationFilterOn(attribute: {
  type: string | EntityAttributeType;
}): boolean {
  const type = attribute.type as EntityAttributeType;
  return ATTRIBUTE_RELATIONS.includes(type);
}
