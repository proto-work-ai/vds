/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { STUnitPrice, Unit, UnitPrice } from './price-list.service';
import { IContentType, ProductType } from './products.data';

// Services
export const withBacklightGroup: STUnitPrice[] = [
] as const;

export const drainingSuspendedPrice: UnitPrice[] = [
  {
    name: 'Слив воды с натяжного потолка',
    text: ' Без проколов и повреждений полотна. Выезд мастера по Москве за 20–40 минут. Выдаём документы для УК и страховой. ',
    unit: Unit.M2,
    price: [2500],
  },
  // {
  //   name: 'Срочный слив воды с натяжного потолка',
  //   text: ' Приоритетный выезд мастера 24/7 по Москве и области. Приезжаем как можно быстрее, делаем слив и базовую просушку за один визит. ',
  //   unit: Unit.Service,
  //   price: [5500],
  // },
  // {
  //   name: 'Обработка потолка',
  //   text: ' Приезжаем ночью и в выходные, когда затопило вне рабочего времени. Полный комплекс работ по сливу воды и защите интерьера. ',
  //   unit: Unit.M2,
  //   price: 800,
  // },
  {
    name: 'Ремонт натяжного потолка',
    text: ' Локальный ремонт после потопа: убираем заломы и морщины, восстанавливаем ровную поверхность и внешний вид полотна. ',
    unit: Unit.M2,
    price: [2500],
  },
  // {
  //   name: 'Вскрытие полотна натяжного потолка',
  //   text: ' Аккуратное вскрытие участка потолка с последующей установкой обратно. Маскируем следы работ, сохраняем эстетику интерьера. ',
  //   unit: Unit.M2,
  //   price: [2500],
  // },
  {
    name: 'Ночной выезд мастера',
    text: ' Приезжаем ночью и в выходные, когда затопило вне рабочего времени. Полный комплекс работ по сливу воды и защите интерьера. ',
    unit: Unit.Service,
    price: [5000],
  },
];

// Pages
export const enum ServicesPageType {
  InstallationSuspendedSeiling = 1, // Монтаж натяжного потолка
  RepairStretchCeilings, // Ремонт натяжных потолков
  DrainingSuspendedCeiling, // Слив воды с натяжного потолка
  RemovingSlattedCeiling, // Демонтаж натяжного потолка
}

// Page Titles
export const servicesPageMapName: Partial<Record<ServicesPageType, string>> = {
  [ServicesPageType.InstallationSuspendedSeiling]: 'Монтаж натяжного потолка',
  [ServicesPageType.RepairStretchCeilings]: 'Ремонт натяжных потолков',
  [ServicesPageType.DrainingSuspendedCeiling]: 'Слив воды с натяжного потолка',
  [ServicesPageType.RemovingSlattedCeiling]: 'Демонтаж натяжного потолка',
} as const;

// Page Products
export const servicesPageProductsMap: Map<ServicesPageType, ProductType[]> = new Map([
  [ServicesPageType.InstallationSuspendedSeiling, [ProductType.InstallationSuspendedSeiling]],
  [ServicesPageType.RepairStretchCeilings, [ProductType.RepairStretchCeilings]],
  [ServicesPageType.DrainingSuspendedCeiling, [ProductType.DrainingSuspendedCeiling]],
  [
    ServicesPageType.RemovingSlattedCeiling,
    [ProductType.RemovingSlattedCeiling, ProductType.RemovingProfile, ProductType.PreparingSubCeiling],
  ],
] as const);
