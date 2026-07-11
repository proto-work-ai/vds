/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PriceUnit, UnitPrice } from './price-list.service';
import { IContentType, ProductTag } from './stretch-ceiling';

export const drainingSuspendedPrice: UnitPrice[] = [
  {
    name: 'Слив воды с натяжного потолка',
    text: ' Без проколов и повреждений полотна. Выезд мастера по Москве за 20–40 минут. Выдаём документы для УК и страховой. ',
    unit: PriceUnit.M2,
    price: [2490],
  },

  {
    name: 'Ремонт натяжного потолка',
    text: ' Локальный ремонт после потопа: убираем заломы и морщины, восстанавливаем ровную поверхность и внешний вид полотна. ',
    unit: PriceUnit.M2,
    price: [2490],
  },

  {
    name: 'Ночной выезд мастера',
    text: ' Приезжаем ночью и в выходные, когда затопило вне рабочего времени. Полный комплекс работ по сливу воды и защите интерьера. ',
    unit: PriceUnit.Service,
    price: [5000],
  },

  // { TODO пока нет лицензии
  //   name: 'Срочный слив воды с натяжного потолка',
  //   text: ' Приоритетный выезд мастера 24/7 по Москве и области. Приезжаем как можно быстрее, делаем слив и базовую просушку за один визит. ',
  //   unit: Unit.Service,
  //   price: [5500],
  // },
  // {
  //   name: 'Обработка потолка',
  //   text: ' Приезжаем ночью и в выходные, когда затопило вне рабочего времени. Полный комплекс работ по сливу воды и защите интерьера. ',
  //   unit: Unit.M2,
  //   price: [800],
  // },
  // {
  //   name: 'Вскрытие полотна натяжного потолка',
  //   text: ' Аккуратное вскрытие участка потолка с последующей установкой обратно. Маскируем следы работ, сохраняем эстетику интерьера. ',
  //   unit: Unit.M2,
  //   price: [2490],
  // },
];

export const repairServicePrice: UnitPrice[] = [
  { name: 'Ремонт натяжного потолка ПВХ (порез, дыра, разрыв, трещина, ожог)', unit: PriceUnit.Service, price: 2490 },
  { name: 'Частичный демонтаж натяжного потолка ПВХ', unit: PriceUnit.Service, price: 2490 },
  { name: 'Устранение провисания полотна натяжного потолка ', unit: PriceUnit.Service, price: 2490 },
  { name: 'Бесследное устранение пореза, разрыва, ожога, прокола', unit: PriceUnit.Service, price: 3000 },
  { name: 'Демонтаж натяжного потолка без сохранения', unit: PriceUnit.M2, price: 200 },
  { name: 'Демонтаж профиля натяжного потолка', unit: PriceUnit.LM, price: 200 },
  { name: 'Демонтаж натяжного потолка ПВХ с сохранением', unit: PriceUnit.M2, price: 250 },
  { name: 'Монтаж полотна на место ПВХ  ', unit: PriceUnit.M2, price: 300 },
  { name: 'Монтаж люстры на ваш потолок ', unit: PriceUnit.Things, price: 700 },

  { name: 'Монтаж светильников на уже установленный натяжной потолок ПВХ', unit: PriceUnit.Things, price: 700 },
  { name: 'Ремонт электрики в натяжном потолке ПВХ ', unit: PriceUnit.Service, price: 3000 },
  { name: 'Сборка вашей люстры (метал, пластик, стекло) ', unit: PriceUnit.Service, price: 1000 },

  { name: 'Замена потолочного плинтуса (вставка, уголок, ТL-образная) ', unit: PriceUnit.LM, price: 250 },

  {
    name: 'Замена лампочек освещения в светильниках, люстрах (светодиодные,галоген)',
    unit: PriceUnit.Things,
    price: 150,
  },
  { name: 'Замена трансформатора, контроллера в потолке  ', unit: PriceUnit.Things, price: 2490 },

  { name: 'Замена каждого последующего трансформатора рядом стоящих ', unit: PriceUnit.Things, price: 500 },

  { name: 'Замена светодиодной ленты с демонтажем полотна ', unit: PriceUnit.LM, price: 400 },
  { name: 'Замена полотна натяжного потолка ПВХ ', unit: PriceUnit.M2, price: 500 },

  { name: 'Замена светодиодной ленты (парящий профиль) ', unit: PriceUnit.LM, price: 250 },

  { name: 'Удаление штукатурки из натяжного потолка', unit: PriceUnit.Service, price: 2000 },
  { name: 'Установка термоусадочного кольца на потолок ПВХ (от 40 до 300мм) ', unit: PriceUnit.Things, price: 300 },

  { name: 'Установка воздушно-приточного клапана (вытяжка 48-100-135мм)', unit: PriceUnit.Things, price: 600 },
  /*
    Антисептическая обработка пространства потолка от плесени (антигрибок)    290 ₽/м2
    Слив воды с натяжного потолка ПВХ                                         2 490 ₽  
    Повторный слив воды с натяжного потолка ПВХ                               2 000 ₽
  */
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
  [ServicesPageType.DrainingSuspendedCeiling]: 'Слив воды с натяжного потолка',
  [ServicesPageType.RepairStretchCeilings]: 'Ремонт натяжных потолков',
  [ServicesPageType.InstallationSuspendedSeiling]: 'Монтаж натяжного потолка',
  [ServicesPageType.RemovingSlattedCeiling]: 'Демонтаж натяжного потолка',
} as const;

// Page Products
export const servicesPageProductsMap: Map<ServicesPageType, ProductTag[]> = new Map([
  [ServicesPageType.InstallationSuspendedSeiling, [ProductTag.InstallationSuspendedSeiling]],
  [ServicesPageType.RepairStretchCeilings, [ProductTag.RepairStretchCeilings]],
  [ServicesPageType.DrainingSuspendedCeiling, [ProductTag.DrainingSuspendedCeiling]],
  [
    ServicesPageType.RemovingSlattedCeiling,
    [ProductTag.RemovingSlattedCeiling, ProductTag.RemovingProfile, ProductTag.PreparingSubCeiling],
  ],
] as const);

// Page Content
export const servicePages: IContentType[] = [
  {
    types: servicesPageProductsMap.get(ServicesPageType.RepairStretchCeilings)!,
    key: 'repair-stretch-ceilings',
    title: servicesPageMapName[ServicesPageType.RepairStretchCeilings]!,
    brief: `Профессиональное удаление порезов, дыр, ожогов, трещин, проколов, пятен на натяжном потолке. Слив воды с потолка. Замена полотна. Ремонт электрики в потолке.`,
    detail: () => import('./services-detail/repair-stretch-ceilings/repair-stretch-ceilings').then((a) => a.Detail),
    image: '/services/services-banner.jpg',
    images: ['/services/services-banner.jpg'],
  },

  // {
  //   types: servicesPageProductsMap.get(ServicesPageType.InstallationSuspendedSeiling)!,
  //   key: 'installation-suspended-seiling',
  //   title: servicesPageMapName[ServicesPageType.InstallationSuspendedSeiling]!,
  //   brief: '',
  //   detail: () =>
  //     import('./services-detail/installation-suspended-seiling/installation-suspended-seiling').then((a) => a.Detail),
  //   image: '/img/catalog/image-2.jpg',
  //   images: ['/img/catalog/image-2.jpg'],
  // },
  // {
  //   types: servicesPageProductsMap.get(ServicesPageType.RemovingSlattedCeiling)!,
  //   key: 'removing-slatted-ceiling',
  //   title: servicesPageMapName[ServicesPageType.RemovingSlattedCeiling]!,
  //   brief: '',
  //   detail: () => import('./services-detail/removing-slatted-ceiling/removing-slatted-ceiling').then((a) => a.Detail),
  //   image: '/img/catalog/image-2.jpg',
  //   images: ['/img/catalog/image-2.jpg'],
  // },

  {
    types: servicesPageProductsMap.get(ServicesPageType.DrainingSuspendedCeiling)!,
    key: 'draining-suspended-ceiling',
    title: servicesPageMapName[ServicesPageType.DrainingSuspendedCeiling]!,
    brief: `Мы сливаем воду без проколов и повреждений — аккуратно. Мастер приезжает в среднем за 20–60 минут и аккуратно восстанавливает потолок после затопления.`,
    // brief: `При затоплении необходимо отключить электричество,
    // вызвать мастеров, которые удалят воду через отверстия светильников или край полотна,
    // а затем просушат его тепловой пушкой для восстановления формы.`,
    detail: () =>
      import('./services-detail/draining-suspended-ceiling/draining-suspended-ceiling').then((a) => a.Detail),
    image: '/services/services-banner.jpg',
    images: ['/services/services-banner.jpg'],
  },
] as const;
