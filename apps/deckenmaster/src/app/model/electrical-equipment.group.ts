import { UnitPrice, PriceUnit } from './price-list.service';

export const electricalEquipmentGroup: UnitPrice[] = [
  { name: 'Светодиодная лента SMD высокоэффективная 24В ip20', unit: PriceUnit.LinearMeter, price: 500 },
  { name: '80д/м, 6Вт, (3000,4000,6000К)', unit: PriceUnit.LinearMeter, price: 1100 },
  { name: 'Пульт/контроллер', unit: PriceUnit.Things, price: 2000 },
] as const;

// Блоки питания
export const powerSuppliesGroup: UnitPrice[] = [
  { name: '60 Ватт, 24В', unit: PriceUnit.Things, price: 1700 },
  { name: '100 Ватт, 24В', unit: PriceUnit.Things, price: 2000 },
  { name: '150 Ватт, 24В', unit: PriceUnit.Things, price: 2200 },
  { name: '200 Ватт, 24В', unit: PriceUnit.Things, price: 2500 },
] as const;

export const electricalEquipmentList = [...electricalEquipmentGroup, ...powerSuppliesGroup];
