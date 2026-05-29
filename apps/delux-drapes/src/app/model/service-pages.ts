/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { STUnitPrice, Unit, UnitPrice } from './price-list.service';
import { IContentType, ProductType } from './products.data';

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

// Page Content
export const servicePages: IContentType[] = [
  // {
  //   types: servicesPageProductsMap.get(ServicesPageType.InstallationSuspendedSeiling)!,
  //   key: 'installation-suspended-seiling',
  //   title: servicesPageMapName[ServicesPageType.InstallationSuspendedSeiling]!,
  //   brief: '',
  //   detail: () =>
  //     import('./services-detail/installation-suspended-seiling/installation-suspended-seiling').then((a) => a.Detail),
  //   image: '/catalog/image-2.jpg',
  //   images: ['/catalog/image-2.jpg'],
  // },
  // {
  //   types: servicesPageProductsMap.get(ServicesPageType.RepairStretchCeilings)!,
  //   key: 'repair-stretch-ceilings',
  //   title: servicesPageMapName[ServicesPageType.RepairStretchCeilings]!,
  //   brief: '',
  //   detail: () => import('./services-detail/repair-stretch-ceilings/repair-stretch-ceilings').then((a) => a.Detail),
  //   image: '/catalog/image-2.jpg',
  //   images: ['/catalog/image-2.jpg'],
  // },
  // {
  //   types: servicesPageProductsMap.get(ServicesPageType.RemovingSlattedCeiling)!,
  //   key: 'removing-slatted-ceiling',
  //   title: servicesPageMapName[ServicesPageType.RemovingSlattedCeiling]!,
  //   brief: '',
  //   detail: () => import('./services-detail/removing-slatted-ceiling/removing-slatted-ceiling').then((a) => a.Detail),
  //   image: '/catalog/image-2.jpg',
  //   images: ['/catalog/image-2.jpg'],
  // },
  {
    types: servicesPageProductsMap.get(ServicesPageType.DrainingSuspendedCeiling)!,
    key: 'draining-suspended-ceiling',
    title: servicesPageMapName[ServicesPageType.DrainingSuspendedCeiling]!,
    text: `Мы сливаем воду без проколов и повреждений — аккуратно. Мастер приезжает в среднем за 20–60 минут и аккуратно восстанавливает потолок после затопления.`,
    // brief: `При затоплении необходимо отключить электричество, 
    // вызвать мастеров, которые удалят воду через отверстия светильников или край полотна, 
    // а затем просушат его тепловой пушкой для восстановления формы.`,
    detail: () =>
      import('./services-detail/draining-suspended-ceiling/draining-suspended-ceiling').then((a) => a.Detail),
    image: '/services/services-banner.jpg',
    images: ['/services/services-banner.jpg'],
  },
] as const;
