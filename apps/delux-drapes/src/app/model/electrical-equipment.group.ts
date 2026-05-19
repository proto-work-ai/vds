import { UnitPrice, Unit } from './price-list.service';

export const electricalEquipmentGroup: UnitPrice[] = [
  { name: 'Светодиодная лента SMD высокоэффективная 24В ip20', unit: Unit.LinearMeter, price: 500 },
  { name: '80д/м, 6Вт, (3000,4000,6000К)', unit: Unit.LinearMeter, price: 1100 },
  { name: 'Пульт/контроллер', unit: Unit.Things, price: 2000 },
] as const;

// Блоки питания
export const powerSuppliesGroup: UnitPrice[] = [
  { name: '60 Ватт, 24В', unit: Unit.Things, price: 1700 },
  { name: '100 Ватт, 24В', unit: Unit.Things, price: 2000 },
  { name: '150 Ватт, 24В', unit: Unit.Things, price: 2200 },
  { name: '200 Ватт, 24В', unit: Unit.Things, price: 2500 },
] as const;

export const electricalEquipmentList = [...electricalEquipmentGroup, ...powerSuppliesGroup];
