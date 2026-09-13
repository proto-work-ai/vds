import {
  ConditionOperatorType,
  OPERATOR_BETWEEN,
  OPERATOR_CONTAINS,
  OPERATOR_END_WITH,
  OPERATOR_EQUALS,
  OPERATOR_GT,
  OPERATOR_GTE,
  OPERATOR_IN,
  OPERATOR_IS,
  OPERATOR_IS_ANY_OF,
  OPERATOR_IS_NOT,
  OPERATOR_IS_NOT_SET,
  OPERATOR_IS_SET,
  OPERATOR_LT,
  OPERATOR_LTE,
  OPERATOR_NOT,
  OPERATOR_NOT_CONTAIN,
  OPERATOR_NOT_IN,
  OPERATOR_START_WITH,
} from './operators';
import { MetaAttributeType, VALUE_KEY_SET } from './base';

interface WhereFilter {
  // String
  equals?: string; // равно
  not?: string; // значение не равняется n
  contains?: string; // n содержит x
  startsWith?: string; // n начинается с x
  endsWith?: string; // n заканчивается x

  // Number
  gt?: string; // n больше x(Greater than)
  gte?: string; // n больше или равно x(Greater than or equal to)
  lt?: string; // n меньше x
  lte?: string; // n меньше или равно x

  in?: string[]; // n содержится в списке(Included in an array)
  notIn?: string[]; // n не содержится в списке(Not included in an array)
}

export interface FilterAndPagination {
  filters?: IFilterField[];
  pagination?: {
    limit?: number;
    page?: number;
    includePageCount?: true;
  };
  order?: {
    orderBy?: Record<string, 'desc' | 'asc'>;
  };
}

export interface FilterAndPaginationEx {
  search?: string;
  pagination?: {
    limit?: number;
    page?: number;
  };
}

export interface IFilterField {
  field: { name: string; type: MetaAttributeType };
  value: any;
  condition?: ConditionOperatorType;
}

export type FilterWhere = Partial<Record<'every' | 'some' | 'none', Record<string, WhereFilter>>>;

/*
where: {
    AND: [
      {
        title: {
          contains: 'TypeScript'
        }
      },
      {
        published: false
      }
    ]
  }

some: {
        title: {
          contains: 'TypeScript'
        }
      }

some: возвращает все связанные записи, соответствующие одному или более критерию фильтрации
every:  возвращает все связанные записи, соответствующие всем критериям
none:  возвращает все связанные записи, не соответствующие ни одному критерию
is: — возвращает все связанные записи, соответствующие критерию
notIs: — возвращает все связанные записи, не соответствующие критерию

value: {
   some: {
    name: 'originalname',
    varchar: { contains: 'sdvwefwef' }
  }
}

*/
export function bindFieldWhere(filters: IFilterField[]) {
  if (!Array.isArray(filters) || filters.length === 0) {
    return null;
  }

  const value: FilterWhere = {};
  // const EVERY = 'every'; не использовать(если все value совпадут то только тогда работает)
  const SOME = 'some';
  const NONE = 'none';

  function extend(
    group: 'some' | 'none',
    { name, type }: { name: string; type: MetaAttributeType },
    condition: ConditionOperatorType,
    conditionValue: any
  ) {
    if (!value[group]) {
      value[group] = {};
    }

    // Find By Field Name
    Object.assign(value[group], { name });

    const valueKey = VALUE_KEY_SET[type];
    if (!value[group][valueKey]) {
      value[group][valueKey] = {};
    }

    // Value By Condition
    Object.assign(value[group][valueKey], { [condition]: conditionValue });
  }

  filters.forEach(({ condition, field, value }) => {
    switch (condition) {
      // String
      case OPERATOR_START_WITH:
      case OPERATOR_END_WITH:
      case OPERATOR_CONTAINS:
      case OPERATOR_EQUALS:
        extend(SOME, field, condition, value);
        break;

      // String Or Number
      case OPERATOR_NOT_CONTAIN:
        extend(NONE, field, OPERATOR_CONTAINS, value);
        break;

      // Number Or Date
      case OPERATOR_LT:
      case OPERATOR_LTE:
      case OPERATOR_GTE:
      case OPERATOR_GT:
        extend(SOME, field, condition, value);
        break;

      // In
      case OPERATOR_IN:
      case OPERATOR_IS_ANY_OF:
        if (Array.isArray(value)) {
          extend(SOME, field, condition, value);
        } else {
          throw `OPERATOR_IN Value not array ${value}`;
        }
        break;

      // Not In
      case OPERATOR_NOT_IN:
        if (Array.isArray(value)) {
          extend(NONE, field, condition, value);
        } else {
          throw `OPERATOR_NOT_IN Value not array ${value}`;
        }
        break;

      // String Or Number
      case OPERATOR_NOT:
        extend(NONE, field, OPERATOR_EQUALS, value);
        break;

      case OPERATOR_IS:
      case OPERATOR_IS_SET:
        extend(NONE, field, OPERATOR_EQUALS, null);
        break;

      case OPERATOR_IS_NOT:
      case OPERATOR_IS_NOT_SET:
        extend(SOME, field, OPERATOR_EQUALS, null);
        break;

      case OPERATOR_BETWEEN:
        throw `bindValueWhere() Operator not supported: ${condition}`;
    }
  });

  return { value };
}
