import { ProductTag } from './product-types';

export enum StretchCeilingsGroup {
  ByTexture = 1, //Тканевые+ ПВХ[PVC](Матовые,Глянцевые,Сатиновые,Фактурные)
  WithBacklight, // С подсветкой(Парящие,Световые линии,Контурные,Световые линии SLOTT,Световые линии Flexy, Подсветка через полотно)

  Premium, // Премиум/Эксклюзивные потолки(Теневые,Бесщелевые,С фотопечатью,Двухуровневые,Звездное небо)
  ByPremises, // По типу помещений(На кухню[kitchen], В коридор[corridor],В ванную[bathroom],В спальню[bedroom], В детскую[nursery], В гостиную[living-room], В доме[house])
  // Fabric, // Тканевые(Тканевые,D-Premium,Clipso,Cerutti)
  InstallationMethod, // Способ установки
}

export const stretchCeilingsGroupName = {
  [StretchCeilingsGroup.WithBacklight]: 'С подсветкой',
  [StretchCeilingsGroup.ByTexture]: 'По фактуре', // По текстуре
  [StretchCeilingsGroup.InstallationMethod]: ' По cпособу установки',
  [StretchCeilingsGroup.Premium]: 'Эксклюзивные дизайн', // Премиум
  [StretchCeilingsGroup.ByPremises]: 'По типу помещений', // Пока нет этова раздела
} as const;

// Потолки по по группам
export const stretchCeilingGroupMap: Map<StretchCeilingsGroup, ProductTag[]> = new Map([
  [ // По фактуре
    StretchCeilingsGroup.ByTexture,
    [
      ProductTag.Matte, 
      ProductTag.Glossy, 
      ProductTag.Satin, 
      ProductTag.Textured, 
      ProductTag.Fabric,
      // -Атласный натяжной потолок*
      // -Перфорированный натяжной потолок*
    ],
  ],
  [ // С подсветкой
    StretchCeilingsGroup.WithBacklight,
    [
      //StretchCeilingsType.LightLines,
      ProductTag.Contour,
      ProductTag.InternalLighting,

      ProductTag.LightLines,
      ProductTag.Floating,
      // TODO потом добавить информацию по этим двум потолкам
      // StretchCeilingsType.LightLinesSlott,
      // StretchCeilingsType.LightLinesFlexy,
      // -Натяжной потолок с теневым зазором и подсветкой*
      // -Подвесной натяжной потолок с подсветкой*
    ],
  ],
  [// Способ установки
    StretchCeilingsGroup.InstallationMethod,
    [
      ProductTag.ShadowKRAAB,
      ProductTag.TwoTiered,
      // -Натяжной потолок с декоративной планкой*
      // -Парящие**
      // -Бесшовное натяжное потолочное потолочное покрытие*
      // -Плавающий натяжной потолок*
    ],
  ],
  [ // Эксклюзивные дизайн
    StretchCeilingsGroup.Premium,
    [
      ProductTag.PhotoPrinting,
      ProductTag.StarrySky,

      // ProductType.Gapless,
      // ProductType.MultiLevel,
    ],
  ],
  // [
  //   StretchCeilingsGroup.ByPremises,
  //   [
  //     StretchCeilingsType.Kitchen,
  //     StretchCeilingsType.Corridor,
  //     StretchCeilingsType.Bathroom,
  //     StretchCeilingsType.Bedroom,
  //     StretchCeilingsType.Nursery,
  //     StretchCeilingsType.LivingRoom,
  //   ],
  // ],
  // [ StretchCeilingsGroup.Fabric, [StretchCeilingsType.Fabric, StretchCeilingsType.DPremium, StretchCeilingsType.Clipso, StretchCeilingsType.Cerutti]],
] as const);

export enum STPriceGroup {
  // По материалу
  PVC = 1, //  ПВХ(материал)
  Fabric, //  Тканевые(материал)
  Satin, //  Сатиновые(материал)*

  // По типу поверхности
  Matte, // Матовые(тип поверхности)*
  Glossy, // Глянцевые(тип поверхности)*
  Textured, // Фактурные(тип поверхности)*

  // С подсветкой
  WithBacklight,

  // По конструкции
  ByDesign,

  // Эксклюзивные
  // Exclusive,

  // Дополнительные работы
  AdditionalWork,

  // Электрооборудование
  ElectricalEquipment,

  // Блоки питания Ip20
  PowerSupplies,
}

export const stretchCeilingGroupName = {
  [STPriceGroup.PVC]: 'ПВХ',
  [STPriceGroup.Fabric]: 'Тканевые',
  [STPriceGroup.Satin]: 'Сатиновые',

  [STPriceGroup.Matte]: 'Матовые',
  [STPriceGroup.Glossy]: 'Глянцевые',
  [STPriceGroup.Textured]: 'Фактурные',

  [STPriceGroup.WithBacklight]: 'С подсветкой',
  [STPriceGroup.ByDesign]: 'По конструкции',
  // [STPriceGroup.Exclusive]: 'Эксклюзивные',
  [STPriceGroup.AdditionalWork]: 'Дополнительные работы',
  [STPriceGroup.ElectricalEquipment]: 'Электрооборудование',
  [STPriceGroup.PowerSupplies]: 'Блоки питания',
} as const;

/*
  https://topspanndecken.de/en#calc
  По фактуре
  -Матовый натяжной потолок
  -Глянцевый натяжной потолок
  -Тканевые натяжной потолок
     https://optceiling.ru/product-category/polotna-dlya-natyazhnyh-potolkov/tkanevye/

  -Атласный натяжной потолок*
  -Перфорированный натяжной потолок*

  С подсветкой
  -С контурной подсветкой
  -Световые линии (линейное освещение)
  -Полупрозрачный (светопроницаемый) натяжной потолок
  -Натяжной потолок с теневым зазором и подсветкой*
  -Подвесной натяжной потолок с подсветкой*

  Способ установки
  -Теневой зазор, натянутый потолок
  -Двухуровневый натяжной потолок

  -Натяжной потолок с декоративной планкой*
  -Парящие**
  -Бесшовное натяжное потолочное потолочное покрытие*
  -Плавающий натяжной потолок*

  Эксклюзивные дизайны
  -Звездное небо
  -Фотопечать

  Производители полотен
  https://www.frontale.su/matovyj-natyazhnoj-potolok
  https://yandex.ru/search/?text=Fabric+stretch+ceilings+%D0%BF%D1%80%D0%BE%D0%B8%D0%B7%D0%B2%D0%BE%D0%B4%D0%B8%D1%82%D0%B5%D0%BB%D0%B8+%D0%BF%D0%BE%D0%BB%D0%BE%D1%82%D0%BD%D0%B0&lr=213
  https://msk.potolki-vsem.ru/catalog/natyazhnye-potolki/po-brendam/?utm_source=yandex&utm_medium=cpc&utm_campaign=710606338&utm_content=cid-710606338_gid-5759146436_ad-1912349886653414280_src-search_pos-premium4_dev-desktop&utm_term=---autotargeting&etext=2202.dXVyhejxtLJTB_nffxNgpPWEpAWF0NLN2AsB75aiUjHc0_Nl3aUtnZpDrlngoQZ-BqL4w_0CWGkELS4lLyUt5xcatzGSkfLikOnChZMgobp4dnl1ZHlzemt3cHhjZWJh.08b2cd9658b7327b53b1abdee89c350963ba0912&yclid=11891741411317383167&ybaip=1&pv_site_region=moscow&pv_site_region_name=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0
*/

