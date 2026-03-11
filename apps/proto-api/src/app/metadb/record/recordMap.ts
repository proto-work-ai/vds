/* eslint-disable no-case-declarations */
/* eslint-disable @nx/enforce-module-boundaries */

import {
  ATTRIBUTE_RELATION_COUNT,
  ATTRIBUTE_PASSWORD,
  ATTRIBUTE_CREATED_AT,
  ATTRIBUTE_ID,
  ATTRIBUTE_TOKEN,
  ATTRIBUTE_UPDATED_AT,
  EntityAttributeType,
  VALUE_KEY_SET,
  ATTRIBUTE_ONE_TO_MANY,
  ATTRIBUTE_MANY_TO_MANY,
} from '@metadb/core';
import { MetaRecord, MetaValue } from '@metadb/client';

export function recordMap({
  values,
  recordKey,
  entry,
  record,
  type,
}: {
  values: MetaValue[];
  recordKey: string;
  entry: MetaRecord;
  record: any;
  type: EntityAttributeType;
}) {
  switch (type) {
    case ATTRIBUTE_ONE_TO_MANY:
    case ATTRIBUTE_MANY_TO_MANY:
      // VOID
      break;
    case ATTRIBUTE_PASSWORD:
      // VOID
      break;
    case ATTRIBUTE_TOKEN:
      // VOID
      break;
    case ATTRIBUTE_RELATION_COUNT:
      // TODO доделать
      break;
    case ATTRIBUTE_ID:
      record[recordKey] = entry.id;
      break;
    case ATTRIBUTE_CREATED_AT:
      record[recordKey] = entry.createdAt;
      break;
    case ATTRIBUTE_UPDATED_AT:
      if (values.length) {
        // Get Last Date
        record[recordKey] = values.reduce(
          (a, b) => (a.createdAt.valueOf() > b.createdAt.valueOf() ? a : b),
          values[0],
        ).updatedAt;
      }
      break;
    default:
      const entryValue = values.find((v) => v.name === recordKey);
      if (entryValue) {
        const value = entryValue[VALUE_KEY_SET[type]];
        switch (type) {
          // case ATTRIBUTE_JSON:
          //   if (typeof value === 'string') {
          //     record[recordKey] = JSON.parse(value);
          //     break;
          //   }
          default:
            record[recordKey] = value;
        }
      }
      return record;
  }
}
