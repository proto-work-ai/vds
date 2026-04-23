/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { signal } from '@angular/core';

export enum STBrandType {
  Bauf = 1,
  Limfer,
  MSD,
  Pongs,
  Teqtum,
  Cerutti,
  Clipso,
  Descor,
}

export interface STBrand {
  brand: STBrandType;
  country: string;
  image: string;
}

export const stretchCeilingBrandMap = new Map<STBrandType, STBrand>([
  [
    STBrandType.Bauf,
    {
      brand: STBrandType.Bauf,
      country: 'Китай',
      image: '/brands/bauf-logo.png',
    },
  ],
  [
    STBrandType.Limfer,
    {
      brand: STBrandType.Limfer,
      country: 'Германия',
      image: '/brands/lumfer-logo.png',
    },
  ],
  [
    STBrandType.MSD,
    {
      brand: STBrandType.MSD,
      country: 'Китай',
      image: '/brands/msd-logo.png',
    },
  ],
  [
    STBrandType.Pongs,
    {
      brand: STBrandType.Pongs,
      country: 'Германия',
      image: '/brands/pongs-logo.png',
    },
  ],
  [
    STBrandType.Teqtum,
    {
      brand: STBrandType.Teqtum,
      country: 'Китай',
      image: '/brands/teqtun-logo.png',
    },
  ],
  [
    STBrandType.Cerutti,
    {
      brand: STBrandType.Cerutti,
      country: 'Италия',
      image: '/brands/cerutti.png',
    },
  ],
  [
    STBrandType.Clipso,
    {
      brand: STBrandType.Clipso,
      country: 'Франция',
      image: '/brands/clipso.png',
    },
  ],
  [
    STBrandType.Descor,
    {
      brand: STBrandType.Descor,
      country: 'Германия',
      image: '/brands/descor.png',
    },
  ],
]);

export interface STPriceBrand {
  brand: STBrandType;
  size: number; //Площадь
  width: number | number[]; //Ширина полотна
  thickness: number | number[]; //Толщина
  warranty: number; //  Гарантия
  operatingTemperature: string; //Температура эксплуатации
  price: number | number[]; //  Цена
}

export enum Unit {
  LinearMeter = 1, // м.пог.
  M2, // M2
  Things, // шт.
  Point, // точка
}

export interface STUnitPrice {
  name: string; // Название
  unit: Unit; // Ед.изм.
  price: number | number[] | string; //  Цена
}

export enum STCategoryType {
  PVC = 1, //  ПВХ
  Fabric, //  Тканевые

  WithBacklighting, //  С подсветкой
  TwoTier, // Двухуровневые
  Exclusive, //  Эксклюзивные

  AdditionalWork, //  Дополнительные работы
  ElectricalEquipment, //  Электрооборудование
  PowerSupplies, //  Блоки питания Ip20
}

export const dataCategoryMap = new Map<STCategoryType, string>([
  [STCategoryType.PVC, 'ПВХ'],
  [STCategoryType.Fabric, 'Тканевые'],
  [STCategoryType.WithBacklighting, 'С подсветкой'],
  [STCategoryType.TwoTier, 'Двухуровневые'],
  [STCategoryType.Exclusive, 'Эксклюзивные'],
  [STCategoryType.AdditionalWork, 'Дополнительные работы'],
  [STCategoryType.ElectricalEquipment, 'Электрооборудование'],
  [STCategoryType.PowerSupplies, ' Блоки питания'],
]);

export function getCategoryMap() {
  const dataMap = new Map<STCategoryType, (STPriceBrand | STUnitPrice)[]>([
    [
      STCategoryType.PVC,
      [
        {
          brand: STBrandType.Bauf,
          size: 30,
          width: 5,
          thickness: [0.16, 0.18],
          warranty: 7,
          operatingTemperature: 'от +3 до +60 °С',
          price: 500,
        },

        {
          brand: STBrandType.Bauf,
          size: 30,
          width: 5,
          thickness: [0.16, 0.18],
          warranty: 7,
          operatingTemperature: 'от +3 до +60 °С',
          price: 600,
        },

        {
          brand: STBrandType.Bauf,
          size: 30,
          width: 5,
          thickness: [0.16, 0.18],
          warranty: 7,
          operatingTemperature: 'от +3 до +60 °С',
          price: 700,
        },

        {
          brand: STBrandType.Pongs,
          size: 30,
          width: 3.2,
          thickness: [0.18, 0.2],
          warranty: 15,
          operatingTemperature: 'от +3 до +60 °С',
          price: 700,
        },

        {
          brand: STBrandType.Limfer,
          size: 30,
          width: [1.5, 2.2],
          thickness: 0.32,
          warranty: 20,
          operatingTemperature: 'от +3 до +60 °С',
          price: 1300,
        },

        {
          brand: STBrandType.Teqtum,
          size: 30,
          width: 5,
          thickness: 0.23,
          warranty: 15,
          operatingTemperature: 'от +3 до +60 °С',
          price: 1300,
        },

        {
          brand: STBrandType.Bauf,
          size: 30,
          width: [1.3, 4.5],
          thickness: [0.205, 0.27],
          warranty: 20,
          operatingTemperature: 'от +3 до +60 °С',
          price: 1400,
        },
      ] as const,
    ],

    [
      STCategoryType.Fabric,
      [
        {
          brand: STBrandType.Descor,
          size: 30,
          width: 5,
          thickness: [0.32, 0.35],
          warranty: 7,
          operatingTemperature: 'от +3 до +60 °С',
          price: 1400,
        },

        {
          brand: STBrandType.Clipso,
          size: 30,
          width: 5,
          thickness: [0.38, 0.4],
          warranty: 7,
          operatingTemperature: 'от +3 до +60 °С',
          price: 4500,
        },

        {
          brand: STBrandType.Cerutti,
          size: 30,
          width: 5,
          thickness: 0.32,
          warranty: 7,
          operatingTemperature: 'от +3 до +60 °С',
          price: 5000,
        },
      ] as const,
    ],

    [
      STCategoryType.WithBacklighting,
      [
        { name: 'Контурные', unit: Unit.LinearMeter, price: 900 },
        { name: 'Парящие', unit: Unit.LinearMeter, price: 2200 },
        { name: 'Световой потолок с эффектом протаивания', unit: Unit.LinearMeter, price: 650 },
        { name: 'Световые линии Secret', unit: Unit.LinearMeter, price: [2200] },
        { name: 'Световые линии SLOTT', unit: Unit.LinearMeter, price: 4000 },
        { name: 'Теневая система EuroKRAAB', unit: Unit.LinearMeter, price: 1400 },
        { name: 'Светопрозрачный потолок', unit: Unit.LinearMeter, price: 4500 },
        { name: 'Скрытая подсветка в карнизах ПК5', unit: Unit.LinearMeter, price: 1000 },
        { name: 'С подсветкой через полотно', unit: Unit.LinearMeter, price: 1000 },
        { name: 'Звездное небо', unit: Unit.M2, price: 1200 },
      ] as const,
    ],

    [
      STCategoryType.TwoTier,
      [
        { name: 'Двухуровневые без подсветки', unit: Unit.LinearMeter, price: 2000 },
        { name: 'Двухуровневые с подсветкой', unit: Unit.LinearMeter, price: 2500 },
        { name: 'Двухуровневые с подсветкой в нише', unit: Unit.LinearMeter, price: 2500 },
        { name: 'Многоуровневый натяжной потолок', unit: Unit.LinearMeter, price: 2000 },
        { name: 'Криволинейный переход', unit: Unit.LinearMeter, price: 1500 },
      ] as const,
    ],

    [
      STCategoryType.Exclusive,
      [
        { name: 'Бесщелевые Kraab 3.0', unit: Unit.LinearMeter, price: 1500 },
        { name: 'Теневые Euro Kraab', unit: Unit.LinearMeter, price: 1200 },
        { name: 'Фотопечать', unit: Unit.M2, price: 2500 },
        { name: '3D потолки', unit: Unit.M2, price: 3500 },
        { name: 'Double Vision', unit: Unit.M2, price: 1500 },
        { name: 'Акустические', unit: Unit.M2, price: 2800 },
        { name: 'Звездное небо', unit: Unit.M2, price: 16000 },
      ] as const,
    ],

    [
      STCategoryType.AdditionalWork,
      [
        { name: 'Ремонт ПВХ потолка', unit: Unit.LinearMeter, price: [5000] },
        { name: 'Слив воды с натяжного потолка', unit: Unit.LinearMeter, price: [700] },
        { name: 'Профиль алюминиевый + штапик + плинтус + монтаж', unit: Unit.LinearMeter, price: [250] },
        { name: 'Дополнительный угол (более 4-х в помещении)', unit: Unit.LinearMeter, price: [200] },
        { name: 'Обход трубы с окантовкой', unit: Unit.LinearMeter, price: [200, 300] },
        { name: 'Крепление люстры универсальное', unit: Unit.Things, price: [400] },
        { name: 'Снятие / Монтаж люстры', unit: Unit.Things, price: [200, 1000] },
        { name: 'Стойка и отверстие для точечного светильника R-50, R-63', unit: Unit.Things, price: [400] },
        { name: 'Опускание светильников от потолка на 20-40 см', unit: Unit.Things, price: [150] },
        { name: 'Опускание светильников от потолка на 40 см и более', unit: Unit.Things, price: [400] },
        { name: 'Светильник с установкой', unit: Unit.Things, price: 'договорная' },
        { name: 'Перфоратор с пылесосом', unit: Unit.LinearMeter, price: [50] },
        { name: 'Монтаж электропроводки', unit: Unit.Point, price: [50] },
        { name: 'Установка трансформатора для питания светильников', unit: Unit.Things, price: [200] },
        { name: 'Стойка и отверстие для элемента пожарной сигнализации', unit: Unit.Things, price: [400] },
        { name: 'Установка бруса', unit: Unit.LinearMeter, price: [] },
        { name: 'Обход кондиционера', unit: Unit.Things, price: [500, 1000] },
        { name: 'Криволинейный участок', unit: Unit.LinearMeter, price: [500] },
        { name: 'Укрепление профиля косыми распорами	', unit: Unit.LinearMeter, price: [150, 200] },
        { name: 'Установка разделителя', unit: Unit.LinearMeter, price: [300] },
        { name: 'Монтаж потолочного карниза', unit: Unit.LinearMeter, price: [500] },
        {
          name: 'Монтаж на сложную поверхность (плитка, керамогранит, ГКЛ и др.)',
          unit: Unit.LinearMeter,
          price: [150, 500],
        },
        { name: 'Демонтаж полотна', unit: Unit.LinearMeter, price: 'договорная' },
        { name: 'Монтаж теневого профиля Еврокрааб (работа + материал)', unit: Unit.LinearMeter, price: 1100 },
        { name: 'Бесщелевая система крепления', unit: Unit.LinearMeter, price: 1900 },
        { name: 'Теневой для ткани EuroSloTT', unit: Unit.LinearMeter, price: 1800 },
        { name: 'Обход внешних углов на теневой системе крепления', unit: Unit.Things, price: 1000 },
        { name: 'Обход внутренних углов на теневой системе крепления', unit: Unit.Things, price: 500 },

        { name: 'Закладные под светильники(круглые, стандарт) электроразводка', unit: Unit.LinearMeter, price: 500 },
        { name: 'Закладные под светильники (квадратные) электроразводка', unit: Unit.LinearMeter, price: 1000 },
        { name: 'Закладные под светильники (квадратные) электроразводка', unit: Unit.LinearMeter, price: 1500 },

        { name: 'Закладная под люстру', unit: Unit.Things, price: 600 },
        { name: 'Световая линия Flexy 5см.', unit: Unit.LinearMeter, price: 3800 },
        { name: 'Световая линия Flexy 3см.', unit: Unit.LinearMeter, price: 4300 },
        { name: 'Подсветка карниза', unit: Unit.LinearMeter, price: 1000 },
        { name: 'Ниша с перегибом полотна', unit: Unit.LinearMeter, price: 1200 },
        { name: 'Монтаж парящего профиля с подсветкой стены ( работа, материал)', unit: Unit.LinearMeter, price: 1800 },
        { name: 'Парящий профиль для тканевых потолков( работа, материал)', unit: Unit.LinearMeter, price: 2000 },
        { name: 'Монтаж контурного профиля с подсветкой стены', unit: Unit.LinearMeter, price: 1100 },
        { name: 'Монтаж трубоотвода', unit: Unit.LinearMeter, price: 600 },
        { name: 'Деревянный брус с креплением', unit: Unit.LinearMeter, price: 600 },
        { name: 'Отбойник', unit: Unit.LinearMeter, price: 1000 },
        { name: 'Монтаж по керамограниту', unit: Unit.LinearMeter, price: 600 },
        { name: 'Обход кондиционера', unit: Unit.LinearMeter, price: 1500 },
      ] as const,
    ],

    [
      STCategoryType.ElectricalEquipment,
      [
        { name: 'Светодиодная лента SMD высокоэффективная 24В ip20', unit: Unit.LinearMeter, price: 500 },
        { name: '80д/м, 6Вт, (3000,4000,6000К)', unit: Unit.LinearMeter, price: 1100 },
        { name: 'Пульт/контроллер', unit: Unit.Things, price: 2000 },
      ] as const,
    ],

    [
      STCategoryType.PowerSupplies,
      [
        { name: '60 Ватт, 24В', unit: Unit.Things, price: 1700 },
        { name: '100 Ватт, 24В', unit: Unit.Things, price: 2000 },
        { name: '150 Ватт, 24В', unit: Unit.Things, price: 2200 },
        { name: '200 Ватт, 24В', unit: Unit.Things, price: 2500 },
      ] as const,
    ],
  ] as const);

  return <T = STPriceBrand | STUnitPrice>(key: STCategoryType) => {
    return dataMap.get(key) as T;
  }
}
