import { STUnitPrice, Unit } from './price-list.service';

export const byDesignGroup: STUnitPrice[] = [
  { name: 'Двухуровневые без подсветки', unit: Unit.LinearMeter, price: 2000 },
  { name: 'Двухуровневые с подсветкой', unit: Unit.LinearMeter, price: 2500 },
  { name: 'Двухуровневые с подсветкой в нише', unit: Unit.LinearMeter, price: 2500 },
  { name: 'Многоуровневый натяжной потолок', unit: Unit.LinearMeter, price: 2000 },
  { name: 'Криволинейный переход', unit: Unit.LinearMeter, price: 1500 },
  { name: 'Double Vision', unit: Unit.M2, price: 1500 },
  { name: 'Бесщелевые Kraab 3.0', unit: Unit.LinearMeter, price: 1500 },
  { name: 'Теневые Euro Kraab', unit: Unit.LinearMeter, price: 1200 },
  { name: 'Фотопечать', unit: Unit.M2, price: 2500 },
  { name: '3D потолки', unit: Unit.M2, price: 3500 },
  { name: 'Акустические', unit: Unit.M2, price: 2800 },
  { name: 'Звездное небо', unit: Unit.M2, price: 16000 },
] as const;
