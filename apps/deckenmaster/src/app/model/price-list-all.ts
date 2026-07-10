/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { STPriceGroup, stretchCeilingGroupName, productTypeName, ProductTag } from './stretch-ceiling';
import { stretchCeilingMaterials } from './ceiling-materials';
import { CeilingMaterialBrand } from './price-list.service';
import { STUnitPrice } from './price-list.service';
import { byDesignGroup, withBacklightGroup } from './stretch-ceiling/by-design.group';

export const stretchCeilingCatalogMap = new Map<STPriceGroup, (CeilingMaterialBrand | STUnitPrice)[]>([
  ...stretchCeilingMaterials,

  // Textured[Фактурные] (тип поверхности)
  // [STPriceGroup.Textured, []],

  // WithBacklight[С подсветкой]
  [STPriceGroup.WithBacklight, withBacklightGroup],

  // ByDesign[По конструкции]
  [STPriceGroup.ByDesign, byDesignGroup],

  // ElectricalEquipment[Электрооборудование]
  // [STPriceGroup.ElectricalEquipment, [...electricalEquipmentGroup, ...powerSuppliesGroup]],
]);

export const dataCategoryMap = new Map<STPriceGroup, string>(
  [...stretchCeilingCatalogMap.keys()].map((type) => [type, stretchCeilingGroupName[type]])
);

function getStretchCeilingAll(): (CeilingMaterialBrand | STUnitPrice)[] {
  return [...stretchCeilingCatalogMap.values()].flat();
}

function oderByPrice(items: (CeilingMaterialBrand | STUnitPrice)[]) {
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
  const list = getStretchCeilingAll();

  return (types: ProductTag[]) => {
    const items = list.filter((a) => types.includes(a.type!));
    return oderByPrice(items)[0];
  };
}

export function injectCatalogMap() {
  return (key: STPriceGroup | undefined) => {
    if (!key || key < 0) {
      key = STPriceGroup.PVC;
    }
    const items: (CeilingMaterialBrand | STUnitPrice)[] = structuredClone(stretchCeilingCatalogMap.get(key))!;
    return items.map((item) => {
      if (!('name' in item)) {
        (item as any).name = productTypeName[item.type!];
      }
      return item;
    });
  };
}

export function getCatalogMap2(types: ProductTag[]) {
  const all = getStretchCeilingAll();
  const items: (CeilingMaterialBrand | STUnitPrice)[] = all.filter((a) => types.includes(a.type!));
  return items.map((item) => {
    if (!('name' in item)) {
      (item as any).name = productTypeName[item.type!];
    }
    return item;
  });
}
