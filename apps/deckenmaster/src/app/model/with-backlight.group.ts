import { STUnitPrice, Unit } from './price-list.service';

//  С подсветкой
export const withBacklight: STUnitPrice[] = [
  { name: 'Контурные', unit: Unit.LinearMeter, price: 900 },
  { name: 'Парящие', unit: Unit.LinearMeter, price: 2200 },
  { name: 'Световой потолок с эффектом протаивания', unit: Unit.LinearMeter, price: 650 },
  { name: 'Теневая система EuroKRAAB', unit: Unit.LinearMeter, price: 1400 },
  { name: 'Светопрозрачный потолок', unit: Unit.LinearMeter, price: 4500 },
  { name: 'Скрытая подсветка в карнизах ПК5', unit: Unit.LinearMeter, price: 1000 },
  { name: 'С подсветкой через полотно', unit: Unit.LinearMeter, price: 1000 },
  { name: 'Световые линии Secret', unit: Unit.LinearMeter, price: [2200] },
  { name: 'Световые линии SLOTT', unit: Unit.LinearMeter, price: 4000 },
  { name: 'Звездное небо', unit: Unit.M2, price: 1200 },
] as const;
