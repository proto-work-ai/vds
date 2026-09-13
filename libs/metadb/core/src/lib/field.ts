/* eslint-disable no-fallthrough */
import { EntityAttributeType, FieldTypeEnum } from './base';

export function getFormFieldType(type: EntityAttributeType): FieldTypeEnum {
  switch (type) {
    case EntityAttributeType.PARENT:
    case EntityAttributeType.PARENT_MANY:
    case EntityAttributeType.ONE_TO_ONE:
    case EntityAttributeType.ONE_TO_MANY:
    case EntityAttributeType.SELECT:
      return FieldTypeEnum.SELECT;

    case EntityAttributeType.DATE:
    case EntityAttributeType.DATETIME:
      return FieldTypeEnum.DATETIME;

    case EntityAttributeType.MEMO:
      return FieldTypeEnum.TEXT;

    case EntityAttributeType.BOOLEAN:
      return FieldTypeEnum.CHECKBOX;

    case EntityAttributeType.TINYINT:
    case EntityAttributeType.SMALLINT:
    case EntityAttributeType.INT:
    case EntityAttributeType.BIGINT:
      return FieldTypeEnum.NUMBER;

    case EntityAttributeType.MEDIA:
      return FieldTypeEnum.MEDIA;

    // case EntityAttributeType.VARBINARY:
    //   return FieldTypeEnum.FILE;

    case EntityAttributeType.FLOAT:
    case EntityAttributeType.TIME:
    case EntityAttributeType.STRING:
    //  return 'text';
    default:
      return FieldTypeEnum.TEXTAREA;
  }
}

export function getFieldType(formField: FieldTypeEnum): EntityAttributeType {
  switch (formField) {
    case FieldTypeEnum.SELECT:
      return EntityAttributeType.SELECT;
    case FieldTypeEnum.DATE:
      return EntityAttributeType.DATE;
    case FieldTypeEnum.DATETIME:
      return EntityAttributeType.DATETIME;
    case FieldTypeEnum.TEXT:
      return EntityAttributeType.MEMO;
    case FieldTypeEnum.MEDIA:
      return EntityAttributeType.MEDIA;
    default:
      return EntityAttributeType.STRING;
  }
}
