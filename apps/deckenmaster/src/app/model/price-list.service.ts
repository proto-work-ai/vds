import { STPriceGroup, ProductTag } from './stretch-ceiling';

export enum STBrandType {
  Bauf = 1,
  Limfer,
  MSD,
  Pongs,
  Teqtum,
  Cerutti,
  Clipso,
  Descor,
}

export interface STBrand {
  brand: STBrandType;
  country: string;
  image: string;
}

export enum PriceUnit {
  LM = 1, // м.пог.
  M2, // M2
  Things, // шт.
  Point, // точка
  Service, // услуга
}

export interface STUnitPrice {
  // name: string; // Название
  type: ProductTag;
  unit: PriceUnit; // Ед.изм.
  price: number | number[] | string; //  Цена
}

export interface UnitPrice {
  name: string; // Название
  text?: string; // Описание
  unit: PriceUnit; // Ед.изм.
  price: number | number[] | string; //  Цена
  image?: string;
}

export interface CeilingMaterialBrand {
  brand: STBrandType;
  group?: STPriceGroup;
  title: string;
  country?: string;
  image?: string;
  type: ProductTag;
  size: number; //Площадь
  width: number | number[]; //Ширина полотна
  thickness: number | number[]; //Толщина
  warranty: number; //  Гарантия
  operatingTemperature: string; //Температура эксплуатации
  price: number | number[]; //  Цена
  unit: PriceUnit;
  description?: string;
}

