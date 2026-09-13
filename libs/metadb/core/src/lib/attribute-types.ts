import { InjectionToken } from '@angular/core';
import {
  ATTRIBUTE_BOOLEAN,
  ATTRIBUTE_JSON,
  ATTRIBUTE_MEDIA,
  ATTRIBUTE_NUMBER,
  ATTRIBUTE_NUMBER_RANGE,
  ATTRIBUTE_ONE_TO_ONE,
  ATTRIBUTE_RICHTEXT,
  ATTRIBUTE_STRING,
  ATTRIBUTE_DATE,
  ATTRIBUTE_DATE_RANGE,
  ATTRIBUTE_CREATED_AT,
  ATTRIBUTE_UPDATED_AT,
  ATTRIBUTE_ID,
  ATTRIBUTE_PASSWORD,
  MetaAttributeType,
  EntityAttributeType,
  ATTRIBUTE_TOKEN,
  ATTRIBUTE_RELATION_COUNT,
  ATTRIBUTE_TEXTAREA,
  ATTRIBUTE_ONE_TO_MANY,
  ATTRIBUTE_MANY_TO_MANY,
} from './base';

export interface IAttributeType {
  title: string;
  type: MetaAttributeType;
  icon: string;
}

export const ATTRIBUTE_TYPE_LIST = new InjectionToken<IAttributeType[]>('ATTRIBUTE_TYPE_LIST', {
  providedIn: 'root',
  factory: () => ATTRIBUTE_TYPES,
});

export const ATTRIBUTE_TYPES: IAttributeType[] = [
  { title: 'Text', type: ATTRIBUTE_STRING, icon: 'attribute-text' },
  { title: 'Textarea', type: ATTRIBUTE_TEXTAREA, icon: 'attribute-richtext' },
  // { title: 'Rich Text', type: ATTRIBUTE_RICHTEXT, icon: 'attribute-richtext' },
  { title: 'Password', type: ATTRIBUTE_PASSWORD, icon: 'attribute-password' },

  { title: 'Number', type: ATTRIBUTE_NUMBER, icon: 'attribute-number' },
  { title: 'Number Range', type: ATTRIBUTE_NUMBER_RANGE, icon: 'attribute-number-range' },

  { title: 'Date', type: ATTRIBUTE_DATE, icon: 'attribute-date' },
  { title: 'Date range', type: ATTRIBUTE_DATE_RANGE, icon: 'attribute-date-range' },
  //{ title: 'Updated At', type: ATTRIBUTE_UPDATED_AT, icon: 'attribute-date-updated-at' },
  //{ title: 'Created At', type: ATTRIBUTE_CREATED_AT, icon: 'attribute-date-created-at' },
  { title: 'Updated At', type: ATTRIBUTE_UPDATED_AT, icon: 'attribute-date' },
  { title: 'Created At', type: ATTRIBUTE_CREATED_AT, icon: 'attribute-date' },

  { title: 'Boolean', type: ATTRIBUTE_BOOLEAN, icon: 'attribute-boolean' },
  { title: 'Media', type: ATTRIBUTE_MEDIA, icon: 'attribute-media' },
  { title: 'JSON', type: ATTRIBUTE_JSON, icon: 'attribute-json' },
  { title: 'One To One', type: ATTRIBUTE_ONE_TO_ONE, icon: 'attribute-one-to-one' },
  { title: 'One To Many', type: ATTRIBUTE_ONE_TO_MANY, icon: 'attribute-one-to-many' },
  { title: 'Many To Many', type: ATTRIBUTE_MANY_TO_MANY, icon: 'attribute-many-to-many' },
  { title: 'Id', type: ATTRIBUTE_ID, icon: 'attribute-uuid' },
];

export const FILTER_ATTRIBUTES: IAttributeType[] = [
  { title: 'Text', type: ATTRIBUTE_STRING, icon: 'attribute-text' },
  { title: 'Textarea', type: ATTRIBUTE_TEXTAREA, icon: 'attribute-text' },
  { title: 'Rich Text', type: ATTRIBUTE_RICHTEXT, icon: 'attribute-richtext' },
  { title: 'Number', type: ATTRIBUTE_NUMBER, icon: 'attribute-number' },
  { title: 'Boolean', type: ATTRIBUTE_BOOLEAN, icon: 'attribute-boolean' },
  { title: 'Date', type: ATTRIBUTE_DATE, icon: 'attribute-date' },

  // Special
  { title: 'Token', type: ATTRIBUTE_TOKEN, icon: 'attribute-security' },
  { title: 'Password', type: ATTRIBUTE_PASSWORD, icon: 'attribute-password' },
  { title: 'Updated At', type: ATTRIBUTE_UPDATED_AT, icon: 'attribute-date-updated-at' },
  { title: 'Created At', type: ATTRIBUTE_CREATED_AT, icon: 'attribute-date-created-at' },
  { title: 'UUID', type: ATTRIBUTE_ID, icon: 'attribute-uuid' },
  { title: 'Token', type: ATTRIBUTE_RELATION_COUNT, icon: 'attribute-security' },
];

export const TYPE_VALUE_LABEL_SET = {
  [EntityAttributeType.ONE_TO_ONE]: 'Relation',
  [EntityAttributeType.BOOLEAN]: 'Boolean',
  [EntityAttributeType.TINYINT]: 'Int(1 byte)',
  [EntityAttributeType.SMALLINT]: 'Int(2 byte)',
  [EntityAttributeType.INT]: 'Int(4 byte)',
  [EntityAttributeType.BIGINT]: 'Int(8 byte)',
  [EntityAttributeType.FLOAT]: 'Float(8 byte)',
  [EntityAttributeType.DATE]: 'Date',
  [EntityAttributeType.DATETIME]: 'Datetime',
  [EntityAttributeType.TIME]: 'Time',
  [EntityAttributeType.STRING]: 'String',
  [EntityAttributeType.MEMO]: 'Текст',
  [EntityAttributeType.MEDIA]: 'File',
  [EntityAttributeType.JSON]: 'JSON',
};
