export interface BaseEventGateway<Type = string, Data = any> {
  type: Type;
  data: Data;
}
