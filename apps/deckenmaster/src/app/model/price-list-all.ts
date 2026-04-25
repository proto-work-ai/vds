/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { STBrandType, STPriceBrand, UnitPrice } from './price-list.service';
import {
  STPriceGroup,
  stretchCeilingGroupName,
  stretchCeilingName,
  StretchCeilingsType,
} from './stretch-ceilings.data';
import { STUnitPrice } from './price-list.service';
import { byDesignGroup, withBacklightGroup } from './by-design.group';

const MatteMSD: STPriceBrand = {
  type: StretchCeilingsType.Matte,
  brand: STBrandType.MSD,
  size: 30,
  width: 5,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от +3 до +60 °С',
  price: 600,
};

const MatteColorMSD: STPriceBrand = {
  type: StretchCeilingsType.MatteColor,
  brand: STBrandType.MSD,
  size: 30,
  width: 5,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от +3 до +60 °С',
  price: 700,
};

const GlossyMSD: STPriceBrand = {
  type: StretchCeilingsType.Glossy,
  brand: STBrandType.MSD,
  size: 30,
  width: 5,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от +3 до +60 °С',
  price: 600,
};

const GlossyColorMSD: STPriceBrand = {
  type: StretchCeilingsType.GlossyColor,
  brand: STBrandType.MSD,
  size: 30,
  width: 5,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от +3 до +60 °С',
  price: 750,
};

const MattePongs: STPriceBrand = {
  type: StretchCeilingsType.Matte,
  brand: STBrandType.Pongs,
  size: 30,
  width: 3.2,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от +3 до +60 °С',
  price: 800,
};

const MatteColorPongs: STPriceBrand = {
  type: StretchCeilingsType.MatteColor,
  brand: STBrandType.Pongs,
  size: 30,
  width: 2,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от +0 до +60 °С',
  price: 100,
};

const GlossyPongs: STPriceBrand = {
  type: StretchCeilingsType.Glossy,
  brand: STBrandType.Pongs,
  size: 30,
  width: 3.2,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от +3 до +60 °С',
  price: 800,
};

const GlossyColorPongs: STPriceBrand = {
  type: StretchCeilingsType.GlossyColor,
  brand: STBrandType.Pongs,
  size: 30,
  width: 2,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от 0 до +60 °С',
  price: 600,
};

const GalaxyGlossyColorMSD: STPriceBrand = {
  type: StretchCeilingsType.GalaxyGlossyColor,
  brand: STBrandType.MSD,
  size: 30,
  width: 3.2,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от +3 до +60 °С',
  price: 900,
};

const FabricDescor: STPriceBrand = {
  type: StretchCeilingsType.Fabric,
  brand: STBrandType.Descor,
  size: 30,
  width: 5,
  thickness: [0.32, 0.35],
  warranty: 7,
  operatingTemperature: 'от -30 до +50 °С',
  price: 1400,
};

const FabricClipso: STPriceBrand = {
  type: StretchCeilingsType.Fabric,
  brand: STBrandType.Clipso,
  size: 30,
  width: 5,
  thickness: [0.38, 0.4],
  warranty: 7,
  operatingTemperature: 'от +3 до +60 °С',
  price: 4500,
};

const FabricCerutti: STPriceBrand = {
  type: StretchCeilingsType.Fabric,
  brand: STBrandType.Cerutti,
  size: 30,
  width: 5,
  thickness: 0.32,
  warranty: 7,
  operatingTemperature: 'от +3 до +60 °С',
  price: 4500,
};

const SatinMSD: STPriceBrand = {
  brand: STBrandType.MSD,
  type: StretchCeilingsType.Satin,
  size: 30,
  width: 5,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от 0 до +60 °С',
  price: 500,
};

// MSD
const SatinColorMSD: STPriceBrand = {
  brand: STBrandType.MSD,
  type: StretchCeilingsType.SatinColor,
  size: 30,
  width: 5,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от 0 до +60 °С',
  price: 700,
};

// Pongs
const SatinPongs: STPriceBrand = {
  brand: STBrandType.Pongs,
  type: StretchCeilingsType.Satin,
  size: 30,
  width: 2,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от 0 до +60 °С',
  price: 800,
};

// Pongs
const SatinColorPongs: STPriceBrand = {
  brand: STBrandType.Pongs,
  type: StretchCeilingsType.SatinColor,
  size: 30,
  width: 2.7,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от 0 до +60 °С',
  price: 1000,
};

const stretchCeilingCatalogMap = new Map<STPriceGroup, (STPriceBrand | STUnitPrice)[]>([
  // PVC (материал)
  [
    STPriceGroup.PVC,
    [
      // MSD
      MatteMSD,

      // MSD
      MatteColorMSD,

      // MSD
      GlossyMSD,

      // MSD
      GlossyColorMSD,

      // MSD
      // GalaxyGlossyColorMSD,

      // Pongs
      MattePongs,

      // Pongs
      MatteColorPongs,

      // Pongs
      GlossyPongs,
    ],
  ],

  // Fabric (материал)
  [STPriceGroup.Fabric, [FabricDescor]],

  // Satin (материал)
  [STPriceGroup.Satin, [SatinMSD, SatinColorMSD, SatinPongs, SatinColorPongs]],

  // Matte (тип поверхности)
  [STPriceGroup.Matte, [MatteMSD, MatteColorMSD, MattePongs, MatteColorPongs, FabricDescor]],

  // Glossy (тип поверхности)
  [STPriceGroup.Glossy, [GlossyMSD, GlossyColorMSD, GlossyPongs, GlossyColorPongs]],

  // Textured[Фактурные] (тип поверхности)
  // [STPriceGroup.Textured, []],

  // WithBacklight[с подсветкой]
  [STPriceGroup.WithBacklight, withBacklightGroup],

  // ByDesign[По конструкции]
  [STPriceGroup.ByDesign, byDesignGroup],

  // ElectricalEquipment[Электрооборудование]
  // [STPriceGroup.ElectricalEquipment, [...electricalEquipmentGroup, ...powerSuppliesGroup]],
]);

export function getCatalogMap() {
  return (key: STPriceGroup | undefined) => {
    if (!key || key < 0) {
      key = STPriceGroup.PVC;
    }
    const items: (STPriceBrand | STUnitPrice)[] = structuredClone(stretchCeilingCatalogMap.get(key))!;
    return items.map((item) => {
      if (!('name' in item)) {
        (item as any).name = stretchCeilingName[item.type!];
      }
      return item;
    });
  };
}

export const dataCategoryMap = new Map<STPriceGroup, string>(
  [...stretchCeilingCatalogMap.keys()].map((type) => [type, stretchCeilingGroupName[type]])
);

function getCatalogAll(): (STPriceBrand | STUnitPrice)[] {
  return [...stretchCeilingCatalogMap.values()].flat();
}

export function injectCatalogPrice() {
  const list = getCatalogAll();

  return (types: StretchCeilingsType[]): number => {
    const items = list.filter((a) => types.includes(a.type!));

    const prices = items
      .filter((a) => typeof a.price !== 'string')
      .map((a) => (Array.isArray(a.price) ? a.price[0] : a.price) as number)
      .sort((a, b) => a - b);

    return prices[0];
  };
}
