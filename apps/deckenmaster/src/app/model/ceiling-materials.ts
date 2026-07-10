/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { STBrandType, CeilingMaterialBrand, PriceUnit, STBrand } from './price-list.service';
import { STPriceGroup, ProductTag } from './stretch-ceiling';

// MSD
const MatteMSD: CeilingMaterialBrand = {
  brand: STBrandType.MSD,
  type: [ProductTag.Matte, ProductTag.Glossy, ProductTag.Satin],
  title: 'MSD Classic',
  size: 30,
  width: 5,
  thickness: [0.13, 0.15],
  warranty: 7,
  operatingTemperature: 'от +3 до +60 °С',
  price: 600,
  unit: PriceUnit.M2,
  country: 'Китай',
  image: '/catalog/brands/msd-logo.png',
};

// MSD
const MattePremiumMSD: CeilingMaterialBrand = {
  brand: STBrandType.MSD,
  type: [ProductTag.Matte, ProductTag.Glossy, ProductTag.Satin],
  title: 'MSD Premium',
  size: 30,
  width: 5,
  thickness: [0.18, 0.21],
  warranty: 10,
  operatingTemperature: 'от +3 до +60 °С',
  price: 800,
  unit: PriceUnit.M2,
  country: 'Китай',
  image: '/catalog/brands/msd-logo.png',
};

const EvolutionMSD: CeilingMaterialBrand = {
  brand: STBrandType.MSD,
  type: [ProductTag.Matte, ProductTag.Glossy, ProductTag.Satin],
  title: 'MSD Evolution',
  size: 30,
  width: 5,
  thickness: [0.19, 0.22],
  warranty: 15,
  operatingTemperature: 'от +3 до +60 °С',
  price: 800,
  unit: PriceUnit.M2,
  country: 'Китай',
  image: '/catalog/brands/msd-logo.png',
};

const ColdStretchMSD: CeilingMaterialBrand = {
  brand: STBrandType.MSD,
  type: [ProductTag.Matte, ProductTag.Glossy, ProductTag.Satin],
  title: 'Cold Stretch',
  size: 30,
  width: 5,
  thickness: [0.19, 0.22],
  warranty: 15,
  operatingTemperature: 'от +3 до +60 °С',
  price: 800,
  unit: PriceUnit.M2,
  country: 'Китай',
  image: '/catalog/brands/msd-logo.png',
  description: 'Без нагрева',
};

// Bauf
const MatteBauf205: CeilingMaterialBrand = {
  brand: STBrandType.Bauf,
  type: [ProductTag.Matte, ProductTag.Glossy, ProductTag.Satin],
  title: 'Bauf 205',
  size: 30,
  width: 5,
  thickness: [0.21],
  warranty: 15,
  operatingTemperature: 'от 0 до +60 °С',
  price: 900,
  unit: PriceUnit.M2,
  country: 'Китай',
  image: '/catalog/brands/bauf-logo.png',
};

// Bauf
const MatteBauf230: CeilingMaterialBrand = {
  brand: STBrandType.Bauf,
  type: [ProductTag.Matte, ProductTag.Glossy, ProductTag.Satin],
  title: 'Bauf 230',
  size: 30,
  width: 5,
  thickness: [0.23],
  warranty: 15,
  operatingTemperature: 'от 0 до +60 °С',
  price: 1000,
  unit: PriceUnit.M2,
  country: 'Китай',
  image: '/catalog/brands/bauf-logo.png',
};

// Bauf
const MatteBauf270: CeilingMaterialBrand = {
  brand: STBrandType.Bauf,
  type: [ProductTag.Matte, ProductTag.Glossy, ProductTag.Satin],
  title: 'Bauf 270',
  size: 30,
  width: 5,
  thickness: [0.27],
  warranty: 15,
  operatingTemperature: 'от 0 до +60 °С',
  price: 1100,
  unit: PriceUnit.M2,
  country: 'Китай',
  image: '/catalog/brands/bauf-logo.png',
};

// MSD
// const MatteColorMSD: CeilingMaterialBrand = {
//   brand: STBrandType.MSD,
//   type: ProductTag.MatteColor,
//   title: 'Classic ПВХ',
//   size: 30,
//   width: 5,
//   thickness: [0.16, 0.18],
//   warranty: 15,
//   operatingTemperature: 'от +3 до +60 °С',
//   price: 700,
//   unit: PriceUnit.M2,
//   country: 'Китай',
//   image: '/catalog/brands/msd-logo.png',
// };

// MSD
// const GlossyMSD: CeilingMaterialBrand = {
//   brand: STBrandType.MSD,
//   type: ProductTag.Glossy,
//   title: 'Classic ПВХ',
//   size: 30,
//   width: 5,
//   thickness: [0.16, 0.18],
//   warranty: 15,
//   operatingTemperature: 'от +3 до +60 °С',
//   price: 600,
//   unit: PriceUnit.M2,
//   country: 'Китай',
//   image: '/catalog/brands/msd-logo.png',
// };

// MSD
// const GlossyColorMSD: CeilingMaterialBrand = {
//   brand: STBrandType.MSD,
//   type: ProductTag.GlossyColor,
//   title: 'Classic ПВХ',
//   size: 30,
//   width: 5,
//   thickness: [0.16, 0.18],
//   warranty: 15,
//   operatingTemperature: 'от +3 до +60 °С',
//   price: 750,
//   unit: PriceUnit.M2,
//   country: 'Китай',
//   image: '/catalog/brands/msd-logo.png',
// };

// MSD
// const GalaxyGlossyColorMSD: CeilingMaterialBrand = {
//   brand: STBrandType.MSD,
//   type: ProductTag.GalaxyGlossyColor,
//   title: 'Classic ПВХ',
//   size: 30,
//   width: 3.2,
//   thickness: [0.16, 0.18],
//   warranty: 15,
//   operatingTemperature: 'от +3 до +60 °С',
//   price: 900,
//   unit: PriceUnit.M2,
// };

// MSD
// const SatinMSD: CeilingMaterialBrand = {
//   brand: STBrandType.MSD,
//   type: ProductTag.Satin,
//   title: 'Classic ПВХ',
//   size: 30,
//   width: 5,
//   thickness: [0.16, 0.18],
//   warranty: 15,
//   operatingTemperature: 'от 0 до +60 °С',
//   price: 500,
//   unit: PriceUnit.M2,
// };

// MSD
// const SatinColorMSD: CeilingMaterialBrand = {
//   brand: STBrandType.MSD,
//   type: ProductTag.SatinColor,
//   title: 'Classic ПВХ',
//   size: 30,
//   width: 5,
//   thickness: [0.16, 0.18],
//   warranty: 15,
//   operatingTemperature: 'от 0 до +60 °С',
//   price: 700,
//   unit: PriceUnit.M2,
// };

// Pongs
const MattePongs: CeilingMaterialBrand = {
  brand: STBrandType.Pongs,
  type: ProductTag.Matte,
  title: 'Classic ПВХ',
  size: 30,
  width: 3.2,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от +3 до +60 °С',
  price: 800,
  unit: PriceUnit.M2,
  country: 'Германия',
  image: '/catalog/brands/pongs-logo.png',
};

// Pongs
const MatteColorPongs: CeilingMaterialBrand = {
  brand: STBrandType.Pongs,
  type: ProductTag.MatteColor,
  title: 'Classic ПВХ',
  size: 30,
  width: 2,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от +0 до +60 °С',
  price: 100,
  unit: PriceUnit.M2,
  country: 'Германия',
  image: '/catalog/brands/pongs-logo.png',
};

// Pongs
const GlossyPongs: CeilingMaterialBrand = {
  brand: STBrandType.Pongs,
  type: ProductTag.Glossy,
  title: 'Classic ПВХ',
  size: 30,
  width: 3.2,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от +3 до +60 °С',
  price: 800,
  unit: PriceUnit.M2,
  country: 'Германия',
  image: '/catalog/brands/pongs-logo.png',
};

// Pongs
const GlossyColorPongs: CeilingMaterialBrand = {
  brand: STBrandType.Pongs,
  type: ProductTag.GlossyColor,
  title: 'Classic ПВХ',
  size: 30,
  width: 2,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от 0 до +60 °С',
  price: 600,
  unit: PriceUnit.M2,
  country: 'Германия',
  image: '/catalog/brands/pongs-logo.png',
};

// Pongs
const SatinPongs: CeilingMaterialBrand = {
  brand: STBrandType.Pongs,
  type: ProductTag.Satin,
  title: 'Classic ПВХ',
  size: 30,
  width: 2,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от 0 до +60 °С',
  price: 800,
  unit: PriceUnit.M2,
  country: 'Германия',
  image: '/catalog/brands/pongs-logo.png',
};

// Pongs
const SatinColorPongs: CeilingMaterialBrand = {
  brand: STBrandType.Pongs,
  type: ProductTag.SatinColor,
  title: 'Classic ПВХ',
  size: 30,
  width: 2.7,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от 0 до +60 °С',
  price: 1000,
  unit: PriceUnit.M2,
  country: 'Германия',
  image: '/catalog/brands/pongs-logo.png',
};

// Descor
const FabricDescor: CeilingMaterialBrand = {
  brand: STBrandType.Descor,
  type: ProductTag.Fabric,
  title: 'Classic ПВХ',
  size: 30,
  width: 5,
  thickness: [0.32, 0.35],
  warranty: 7,
  operatingTemperature: 'от -30 до +50 °С',
  price: 1400,
  unit: PriceUnit.M2,
  country: 'Германия',
  image: '/catalog/brands/descor.png',
};

// Clipso
const FabricClipso: CeilingMaterialBrand = {
  brand: STBrandType.Clipso,
  type: ProductTag.Fabric,
  title: 'Classic ПВХ',
  size: 30,
  width: 5,
  thickness: [0.38, 0.4],
  warranty: 7,
  operatingTemperature: 'от +3 до +60 °С',
  price: 4500,
  unit: PriceUnit.M2,
  country: 'Франция',
  image: '/catalog/brands/clipso.png',
};

// Cerutti
const FabricCerutti: CeilingMaterialBrand = {
  brand: STBrandType.Cerutti,
  type: ProductTag.Fabric,
  title: 'Classic ПВХ',
  size: 30,
  width: 5,
  thickness: 0.32,
  warranty: 7,
  operatingTemperature: 'от +3 до +60 °С',
  price: 4500,
  unit: PriceUnit.M2,
  country: 'Италия',
  image: '/catalog/brands/cerutti.png',
};

const MatteTeqtum: CeilingMaterialBrand = {
  brand: STBrandType.Teqtum,
  type: ProductTag.Matte,
  title: 'Teqtum EURO',
  size: 30,
  width: 5,
  thickness: [0.23],
  warranty: 15,
  operatingTemperature: 'от 0 до +60 °С',
  price: 1200,
  unit: PriceUnit.M2,
  country: 'Германия',
  image: '/catalog/brands/lumfer-logo.png',
  description: 'Не горючий',
};

// Limfer
const MatteLimfer: CeilingMaterialBrand = {
  brand: STBrandType.Limfer,
  type: ProductTag.Matte,
  title: 'Lumfer',
  size: 30,
  width: 2,
  thickness: [0.34],
  warranty: 20,
  operatingTemperature: 'от 0 до +60 °С',
  price: 1200,
  unit: PriceUnit.M2,
  country: 'Германия',
  image: '/catalog/brands/lumfer-logo.png',
  description: 'Лучшие показатели',
};

export const stretchCeilingMaterials = new Map<STPriceGroup, CeilingMaterialBrand[]>([
  // PVC (материал)
  [
    STPriceGroup.PVC,
    [
      MatteMSD,
      MattePremiumMSD,
      EvolutionMSD,
      ColdStretchMSD,

      MatteBauf205,
      MatteBauf230,
      MatteBauf270,

      MattePongs,
      MatteColorPongs,
      GlossyPongs,
    ],
  ],

  // Fabric (материал)
  [STPriceGroup.Fabric, [FabricDescor, FabricClipso, FabricCerutti]],

  // Satin (материал)
  [
    STPriceGroup.Satin,
    [
      MatteMSD,
      MattePremiumMSD,
      EvolutionMSD,
      ColdStretchMSD,

      MatteBauf205,
      MatteBauf230,
      MatteBauf270,

      SatinPongs,
      SatinColorPongs,
    ],
  ],

  // Matte (тип поверхности)
  [
    STPriceGroup.Matte,
    [
      MatteMSD,
      MattePremiumMSD,
      EvolutionMSD,
      ColdStretchMSD,

      MatteBauf205,
      MatteBauf230,
      MatteBauf270,

      MattePongs,
      MatteColorPongs,
    ],
  ],

  // Glossy (тип поверхности)
  [
    STPriceGroup.Glossy,
    [
      MatteMSD,
      MattePremiumMSD,
      EvolutionMSD,
      ColdStretchMSD,

      MatteBauf205,
      MatteBauf230,
      MatteBauf270,
      ,
      GlossyPongs,
      GlossyColorPongs,
    ],
  ],
]);

export const stretchCeilingBrandMap = Array.from(stretchCeilingMaterials, ([type, list]) => list)
  .flat()
  .reduce((map, { brand, country, image }) => {
    map.set(brand, {
      brand,
      country,
      image,
    });
    return map;
  }, new Map());

// [
//   STBrandType.Teqtum,
//   {
//     brand: STBrandType.Teqtum,
//     country: 'Китай',
//     image: '/catalog/brands/teqtun-logo.png',
//   },
// ],
