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
  type?: ProductTag;
  size: number; //Площадь
  width: number | number[]; //Ширина полотна
  thickness?: number | number[]; //Толщина
  warranty: number; //  Гарантия
  operatingTemperature: string; //Температура эксплуатации
  price: number | number[]; //  Цена
  unit: PriceUnit;
  country?: string;
  image?: string;
  title?: string;
  description?: string;
}

export const stretchCeilingBrandMap = new Map<STBrandType, STBrand>([
  [
    STBrandType.Bauf,
    {
      brand: STBrandType.Bauf,
      country: 'Китай',
      image: '/brands/bauf-logo.png',
    },
  ],
  [
    STBrandType.Limfer,
    {
      brand: STBrandType.Limfer,
      country: 'Германия',
      image: '/brands/lumfer-logo.png',
    },
  ],
  [
    STBrandType.MSD,
    {
      brand: STBrandType.MSD,
      country: 'Китай',
      image: '/brands/msd-logo.png',
    },
  ],
  [
    STBrandType.Pongs,
    {
      brand: STBrandType.Pongs,
      country: 'Германия',
      image: '/brands/pongs-logo.png',
    },
  ],
  [
    STBrandType.Teqtum,
    {
      brand: STBrandType.Teqtum,
      country: 'Китай',
      image: '/brands/teqtun-logo.png',
    },
  ],
  [
    STBrandType.Cerutti,
    {
      brand: STBrandType.Cerutti,
      country: 'Италия',
      image: '/brands/cerutti.png',
    },
  ],
  [
    STBrandType.Clipso,
    {
      brand: STBrandType.Clipso,
      country: 'Франция',
      image: '/brands/clipso.png',
    },
  ],
  [
    STBrandType.Descor,
    {
      brand: STBrandType.Descor,
      country: 'Германия',
      image: '/brands/descor.png',
    },
  ],
]);
