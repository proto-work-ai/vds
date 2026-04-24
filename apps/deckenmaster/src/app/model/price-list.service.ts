import { StretchCeilingsType } from './stretch-ceilings.data';

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

export interface STPriceBrand {
  brand: STBrandType;
  group?: STPriceGroup;
  type?: StretchCeilingsType;
  size: number; //Площадь
  width: number | number[]; //Ширина полотна
  thickness?: number | number[]; //Толщина
  warranty: number; //  Гарантия
  operatingTemperature: string; //Температура эксплуатации
  price: number | number[]; //  Цена
}

export interface STBrand {
  brand: STBrandType;
  country: string;
  image: string;
}

export enum Unit {
  LinearMeter = 1, // м.пог.
  M2, // M2
  Things, // шт.
  Point, // точка
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

export interface STUnitPrice {
  name: string; // Название
  unit: Unit; // Ед.изм.
  price: number | number[] | string; //  Цена
}

export enum STPriceGroup {
  // По материалу
  PVC = 1, //  ПВХ(материал)
  Fabric, //  Тканевые(материал)
  Satin, //  Сатиновые(материал)*

  // По типу поверхности
  Matte, // Матовые(тип поверхности)*
  Glossy, // Глянцевые(тип поверхности)*
  Textured, // Фактурные(тип поверхности)*

  // С подсветкой
  WithBacklight,

  // По конструкции
  ByDesign,

  // Эксклюзивные
  // Exclusive,

  // Дополнительные работы
  AdditionalWork,

  // Электрооборудование
  ElectricalEquipment,

  // Блоки питания Ip20
  PowerSupplies,
}

// export const dataCategoryMap = new Map<STPriceGroup, string>([
//   [STPriceGroup.PVC, 'ПВХ'],
//   [STPriceGroup.Fabric, 'Тканевые'],
//   [STPriceGroup.WithBacklight, 'С подсветкой'],
//   [STPriceGroup.ByDesign, 'Двухуровневые'],
//   // [STPriceGroup.Exclusive, 'Эксклюзивные'],
//   [STPriceGroup.AdditionalWork, 'Дополнительные работы'],
//   [STPriceGroup.ElectricalEquipment, 'Электрооборудование'],
//   [STPriceGroup.PowerSupplies, ' Блоки питания'],
// ]);
