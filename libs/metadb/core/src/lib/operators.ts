/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ATTRIBUTE_BOOLEAN,
  ATTRIBUTE_DATE,
  ATTRIBUTE_NUMBER,
  ATTRIBUTE_PASSWORD,
  ATTRIBUTE_RICHTEXT,
  ATTRIBUTE_STRING,
  ATTRIBUTE_TEXTAREA,
  ATTRIBUTE_ID,
  ATTRIBUTE_TIME,
  MetaAttributeType,
  ATTRIBUTE_BIGINT,
  ATTRIBUTE_INT,
  ATTRIBUTE_UPDATED_AT,
  ATTRIBUTE_CREATED_AT,
  ATTRIBUTE_SMALLINT,
  ATTRIBUTE_TINYINT,
} from './base';
import { SelectOptionItem } from './form';

export const FILTER_OPERATORS = ['and', 'or', 'not', 'not null'];

/*
null	        Is null
notNull	      Is not null

eq	          Equal
eqi	          Equal (case-insensitive)
ne	          Not equal
nei	          Not equal (case-insensitive)

lt	          Less than
lte	          Less than or equal to
gt	          Greater than
gte	          Greater than or equal to

in	          Included in an array
notIn	        Not included in an array

contains	    Contains
notContains	  Does not contain
*containsi	    Contains (case-insensitive)
*notContainsi	Does not contain (case-insensitive)

between	      Is between

startsWith	  Starts with
*startsWithi	  Starts with (case-insensitive)

endsWith	    Ends with
*endsWithi    	Ends with (case-insensitive)

*or	          Joins the filters in an "or" expression
*and	          Joins the filters in an "and" expression
*not	          Joins the filters in an "not" expression

*Last          Последний
*Not in the last Не в последнем
*Between       Между
*Not between   Не между
*On            На
*Not on        Не на
*Before        Перед
*Before the last Перед последним
*Since         С тех пор
*In the next   В следующем
*/

export const OPERATOR_IS = 'is'; //Есть( every:{not = null})
export const OPERATOR_IS_SET = 'isSet'; //Установлено( every:{equals = n})

export const OPERATOR_IS_NOT = 'isNot'; //* Не есть (every:{equals = null})
export const OPERATOR_IS_NOT_SET = 'isNotSet'; //* Не установлено (none: {equals = n})

export const OPERATOR_START_WITH = 'startsWith';
export const OPERATOR_END_WITH = 'endsWith';

export const OPERATOR_IN = 'in'; // Является любым из(every:{in = [x,y,z]})
export const OPERATOR_NOT_IN = 'notIn'; // Не является любым из(every:{in = [x,y,z]})
export const OPERATOR_IS_ANY_OF = 'inOf'; //* Является любым из(every:{in = [x,y,z]})

export const OPERATOR_EQUALS = 'equals';
export const OPERATOR_NOT = 'not';
export const OPERATOR_CONTAINS = 'contains'; // Содержит (every:{contains = n})
export const OPERATOR_NOT_CONTAIN = 'notContains'; // Не содержит(none: {contains = n})

export const OPERATOR_GT = 'gt';
export const OPERATOR_GTE = 'gte';

export const OPERATOR_LT = 'lt';
export const OPERATOR_LTE = 'lte';

// TODO Add Support
export const OPERATOR_BETWEEN = 'between';

export type ConditionOperatorType =
  | typeof OPERATOR_IN
  | typeof OPERATOR_NOT_IN
  | typeof OPERATOR_IS_ANY_OF
  | typeof OPERATOR_IS
  | typeof OPERATOR_IS_NOT
  | typeof OPERATOR_IS_SET
  | typeof OPERATOR_IS_NOT_SET
  | typeof OPERATOR_NOT
  | typeof OPERATOR_CONTAINS
  | typeof OPERATOR_NOT_CONTAIN
  | typeof OPERATOR_BETWEEN
  | typeof OPERATOR_START_WITH
  | typeof OPERATOR_END_WITH
  | typeof OPERATOR_EQUALS
  | typeof OPERATOR_LT
  | typeof OPERATOR_LTE
  | typeof OPERATOR_GT
  | typeof OPERATOR_GTE;

export const ConditionOperatorEnum = {
  IS: OPERATOR_IS,
  IS_NOT: OPERATOR_IS_NOT,
  IS_SET: OPERATOR_IS_SET,
  NOT_SET: OPERATOR_IS_NOT_SET,
  CONTAINS: OPERATOR_CONTAINS,
  NOT_CONTAIN: OPERATOR_NOT_CONTAIN,
  IS_ANY_OF: OPERATOR_IS_ANY_OF,
};

export function getOperatorTitleByType(type: ConditionOperatorType) {
  switch (type) {
    case OPERATOR_IS:
      return 'Is not null';
    case OPERATOR_IS_NOT:
      return 'Is null';

    case OPERATOR_IS_SET:
      return 'Is set';
    case OPERATOR_IS_NOT_SET:
      return 'Is not set';

    case OPERATOR_IS_ANY_OF:
      return 'Is any of';

    case OPERATOR_START_WITH:
      return 'Starts with';
    case OPERATOR_END_WITH:
      return ' Ends with';
    case OPERATOR_EQUALS:
      return 'Equal';

    case OPERATOR_NOT:
      return 'Not equal';
    case OPERATOR_LT:
      return 'Less than';
    case OPERATOR_LTE:
      return 'Less than or equal to';
    case OPERATOR_GT:
      return 'Greater than';
    case OPERATOR_GTE:
      return 'Greater than or equal to';
    case OPERATOR_IN:
      return 'Included in an array';
    case OPERATOR_NOT_IN:
      return 'Not included in an array';
    case OPERATOR_CONTAINS:
      return 'Contains';
    case OPERATOR_NOT_CONTAIN:
      return 'Does not contain';

    case OPERATOR_BETWEEN:
      return 'Is between';

    default:
      throw `getOperatorTitleByType(): ${type}`;
  }
}

export function getOperatorsByType(type: MetaAttributeType): string[] {
  switch (type) {
    // String
    case ATTRIBUTE_TEXTAREA:
    case ATTRIBUTE_PASSWORD:
    case ATTRIBUTE_RICHTEXT:
    case ATTRIBUTE_STRING:
    case ATTRIBUTE_ID:
      return [
        OPERATOR_EQUALS,
        OPERATOR_NOT,

        OPERATOR_CONTAINS,
        OPERATOR_NOT_CONTAIN,

        OPERATOR_IS,
        OPERATOR_IS_NOT,

        //OPERATOR_IS_SET,
        //OPERATOR_IS_NOT_SET,
        //OPERATOR_IS_ANY_OF
      ];

    // Number
    case ATTRIBUTE_TINYINT:
    case ATTRIBUTE_SMALLINT:
    case ATTRIBUTE_INT:
    case ATTRIBUTE_BIGINT:
    case ATTRIBUTE_NUMBER:
      return [
        OPERATOR_EQUALS,
        OPERATOR_NOT,

        OPERATOR_IS,
        OPERATOR_IS_NOT,
        //OPERATOR_IS_SET,
        //OPERATOR_IS_NOT_SET,

        OPERATOR_LT,
        OPERATOR_LTE,

        OPERATOR_GT,
        OPERATOR_GTE,
      ];

    // Date
    case ATTRIBUTE_UPDATED_AT:
    case ATTRIBUTE_CREATED_AT:
    case ATTRIBUTE_TIME:
    case ATTRIBUTE_DATE:
      return [
        OPERATOR_EQUALS,
        OPERATOR_NOT,

        OPERATOR_IS,
        OPERATOR_IS_NOT,
        //OPERATOR_IS_SET,
        //OPERATOR_IS_NOT_SET,

        OPERATOR_LT,
        OPERATOR_LTE,

        OPERATOR_GT,
        OPERATOR_GTE,
      ];

    // Boolean
    case ATTRIBUTE_BOOLEAN:
      return [
        OPERATOR_NOT,
        OPERATOR_EQUALS,

        OPERATOR_IS,
        OPERATOR_IS_NOT,
        //OPERATOR_IS_SET,
        //OPERATOR_IS_NOT_SET,
      ];
  }
  return [];
}

export function getOptionsOperatorByType(type: MetaAttributeType) {
  return getOperatorsByType(type as any).map((operator) => {
    return {
      title: getOperatorTitleByType(operator as any),
      value: operator as any,
    } satisfies SelectOptionItem<ConditionOperatorType>;
  });
}
