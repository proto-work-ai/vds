import { STUnitPrice, Unit } from './price-list.service';
import { ProductType } from './products.data';

// Services
export const withBacklightGroup: STUnitPrice[] = [
  // Монтаж натяжного потолка
  { type: ProductType.InstallationSuspendedSeiling, unit: Unit.LinearMeter, price: 2200 },
  // Ремонт натяжных потолков
  { type: ProductType.RepairStretchCeilings, unit: Unit.LinearMeter, price: 2200 },
  // Слив воды с натяжного потолка
  { type: ProductType.DrainingSuspendedCeiling, unit: Unit.LinearMeter, price: [1500] },

  // Демонтаж натяжного потолка
  { type: ProductType.RemovingSlattedCeiling, unit: Unit.LinearMeter, price: 500 }, // Демонтаж реечного потолка
  { type: ProductType.RemovingProfile, unit: Unit.LinearMeter, price: 1000 }, // Демонтаж профиля
  { type: ProductType.PreparingSubCeiling, unit: Unit.LinearMeter, price: 100 }, // Подготовка чернового потолка работа
] as const;

export enum ServicesGroupType {
  InstallationSuspendedSeiling = 1,// Монтаж натяжного потолка
  RepairStretchCeilings,// Ремонт натяжных потолков
  DrainingSuspendedCeiling,// Слив воды с натяжного потолка
  RemovingSlattedCeiling,// Демонтаж натяжного потолка
}

export const servicesGroupMap: Map<ServicesGroupType, ProductType[]> = new Map([
  [ServicesGroupType.InstallationSuspendedSeiling, [ProductType.InstallationSuspendedSeiling]],
  [ServicesGroupType.RepairStretchCeilings, [ProductType.RepairStretchCeilings]],
  [ServicesGroupType.RemovingSlattedCeiling, [ProductType.RemovingSlattedCeiling, ProductType.RemovingProfile, ProductType.PreparingSubCeiling]],
] as const);
