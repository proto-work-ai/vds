/* eslint-disable @nx/enforce-module-boundaries */
import {
  ATTRIBUTE_BOOLEAN,
  attributeRelationFilterExcept,
  attributeViewFilterExcept,
  EntityAttributeType,
  VALUE_KEY_SET,
} from '@metadb/core';
import { MetaAttribute, MetaValue } from '@prisma/client';

/*
  использовать только для простых хначений не relation
*/
export function getValuesForRecord(
  record: Record<string, any>,
  attributes: Pick<MetaAttribute, 'id' | 'name' | 'type'>[],
): MetaValue[] {
  return (
    attributes
      // Убираем атрибуты которые не редактируем
      .filter(attributeViewFilterExcept)
      .filter(attributeRelationFilterExcept)
      // Убираем атрибуты у которых нет значения(PATCH)
      .filter((attribute) => attribute.name in record)
      .map((attribute) => {
        return getValueForRecord(record, attribute);
      })
  );
}

/*
  использовать только для простых хначений не relation
*/
function getValueForRecord(
  record: Record<string, any>,
  attribute: Pick<MetaAttribute, 'id' | 'name' | 'type'>,
): MetaValue {
  const type = attribute.type as EntityAttributeType;
  const valueKey = VALUE_KEY_SET[type];

  return {
    name: attribute.name,
    attributeId: attribute.id,
    [valueKey]: prepareValueForDatabase(record[attribute.name], type),
  } as MetaValue;
}

function prepareValueForDatabase(
  value: any,
  attributeType: EntityAttributeType,
) {
  switch (attributeType) {
    case ATTRIBUTE_BOOLEAN:
      return value ? 1 : 0;
    // case ATTRIBUTE_JSON:
    //   if (typeof value === 'string') {
    //     return value;
    //   } else {
    //     try {
    //       return JSON.stringify(value);
    //     } catch (e) {
    //       throw 'prepareValueForDatabase JSON.stringify Error';
    //     }
    //   }
    default:
      return value;
  }
}
