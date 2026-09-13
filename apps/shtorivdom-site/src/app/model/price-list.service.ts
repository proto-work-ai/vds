// Прайс по видам штор, карнизов и жалюзи.
// TODO: цифры ориентировочные, заменить на реальный прайс салона.

export enum Unit {
  LinearMeter = 1, // м.пог.
  M2, // м²
  Things, // шт.
}

export const unitName: Record<Unit, string> = {
  [Unit.LinearMeter]: 'м.пог.',
  [Unit.M2]: 'м²',
  [Unit.Things]: 'шт.',
};

export interface CurtainPrice {
  name: string; // Ткань / модель
  country: string; // Производство
  width?: number | number[]; // Ширина рулона ткани, м
  warranty: number; // Гарантия, лет
  price: number | number[]; // Цена «от» (или диапазон) с пошивом и установкой
  unit: Unit;
}

// Ключ — `key` страницы каталога из catalog.data.ts
export const curtainPriceMap: Record<string, CurtainPrice[]> = {
  'blackout-curtains': [
    { name: 'Блэкаут однотонный', country: 'Турция', width: 2.8, warranty: 3, price: 2500, unit: Unit.LinearMeter },
    {
      name: 'Блэкаут с фактурой льна',
      country: 'Турция',
      width: 2.8,
      warranty: 3,
      price: 3200,
      unit: Unit.LinearMeter,
    },
    {
      name: 'Блэкаут жаккард',
      country: 'Германия',
      width: 3,
      warranty: 5,
      price: [4500, 7000],
      unit: Unit.LinearMeter,
    },
  ],
  'roman-blinds': [
    { name: 'Лёгкая ткань', country: 'Турция', width: 2.8, warranty: 3, price: 4500, unit: Unit.M2 },
    { name: 'Плотная ткань / блэкаут', country: 'Турция', width: 2.8, warranty: 3, price: 5500, unit: Unit.M2 },
    { name: 'Лён премиум', country: 'Италия', width: 3, warranty: 5, price: [8000, 12000], unit: Unit.M2 },
  ],
  'roller-blinds': [
    { name: 'Мини, ткань стандарт', country: 'Россия', width: [0.3, 1.6], warranty: 2, price: 2200, unit: Unit.M2 },
    { name: 'Кассетные UNI', country: 'Россия', width: [0.3, 1.8], warranty: 3, price: 3500, unit: Unit.M2 },
    { name: 'День-ночь (зебра)', country: 'Корея', width: [0.3, 2.5], warranty: 3, price: 4200, unit: Unit.M2 },
  ],
  'linen-curtains': [
    { name: 'Лён с хлопком', country: 'Турция', width: 2.8, warranty: 3, price: 2800, unit: Unit.LinearMeter },
    { name: 'Натуральный лён', country: 'Беларусь', width: 2.6, warranty: 3, price: 4000, unit: Unit.LinearMeter },
    { name: 'Итальянский лён', country: 'Италия', width: 3, warranty: 5, price: [6500, 9500], unit: Unit.LinearMeter },
  ],
  'pleated-blinds': [
    { name: 'Плиссе стандарт', country: 'Россия', width: [0.3, 1.8], warranty: 2, price: 3500, unit: Unit.M2 },
    { name: 'Плиссе блэкаут', country: 'Германия', width: [0.3, 1.8], warranty: 3, price: 5000, unit: Unit.M2 },
    { name: 'Мансардные плиссе', country: 'Германия', width: [0.3, 1.5], warranty: 3, price: 7500, unit: Unit.M2 },
  ],
  'curtain-rods': [
    { name: 'Профильный алюминиевый', country: 'Россия', warranty: 3, price: 900, unit: Unit.LinearMeter },
    {
      name: 'Декоративный металлический',
      country: 'Германия',
      warranty: 5,
      price: [2500, 6000],
      unit: Unit.LinearMeter,
    },
    { name: 'Электрокарниз', country: 'Германия', warranty: 2, price: 18000, unit: Unit.Things },
  ],
  blinds: [
    { name: 'Горизонтальные алюминиевые', country: 'Россия', warranty: 2, price: 1500, unit: Unit.M2 },
    { name: 'Вертикальные тканевые', country: 'Россия', warranty: 2, price: 1800, unit: Unit.M2 },
    { name: 'Деревянные', country: 'Китай', warranty: 3, price: 6500, unit: Unit.M2 },
  ],
};
