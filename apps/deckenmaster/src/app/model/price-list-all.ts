/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { STBrandType, STPriceBrand, Unit, UnitPrice } from './price-list.service';
import {
  STPriceGroup,
  stretchCeilingGroupName,
  stretchCeilingName,
  StretchCeilingsType,
} from './stretch-ceilings.data';
import { STUnitPrice } from './price-list.service';
import { byDesignGroup, withBacklightGroup } from './by-design.group';
import { map } from 'rxjs';

const MatteMSD: STPriceBrand = {
  type: StretchCeilingsType.Matte,
  brand: STBrandType.MSD,
  size: 30,
  width: 5,
  thickness: [0.16, 0.18],
  warranty: 15,
  operatingTemperature: 'от +3 до +60 °С',
  price: 600,
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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
  unit: Unit.M2,
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

export const dataCategoryMap = new Map<STPriceGroup, string>(
  [...stretchCeilingCatalogMap.keys()].map((type) => [type, stretchCeilingGroupName[type]])
);

function getCatalogAll(): (STPriceBrand | STUnitPrice)[] {
  return [...stretchCeilingCatalogMap.values()].flat();
}

function oderByPrice(items: (STPriceBrand | STUnitPrice)[]) {
  return items
    .filter((a) => typeof a.price !== 'string')
    .map((a) => {
      const price = (Array.isArray(a.price) ? a.price[0] : a.price) as number;
      return [price, a] as const;
    })
    .sort((a, b) => {
      const [p1] = a;
      const [p2] = b;
      return p1 - p2;
    });
}

export function injectCatalogPrice() {
  const list = getCatalogAll();

  return (types: StretchCeilingsType[]) => {
    const items = list.filter((a) => types.includes(a.type!));
    return oderByPrice(items)[0];
  };
}

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

export function getCatalogMap2(types: StretchCeilingsType[]) {
  const all = getCatalogAll();
  const items: (STPriceBrand | STUnitPrice)[] = all.filter((a) => types.includes(a.type!));
  return items.map((item) => {
    if (!('name' in item)) {
      (item as any).name = stretchCeilingName[item.type!];
    }
    return item;
  });
}
