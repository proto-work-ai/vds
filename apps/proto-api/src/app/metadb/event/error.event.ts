import { BaseEventGateway } from './base-event';

export const DS_ERROR_EVENT = 'error';

export interface ErrorEventData {
  error;
  name;
  date?: string;
}

export type ErrorEventGateway = BaseEventGateway<
  typeof DS_ERROR_EVENT,
  ErrorEventData
>;
