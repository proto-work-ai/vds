import { ProductType } from "./product-types";

export enum StretchCeilingsGroup {
  ByTexture = 1, //Тканевые+ ПВХ[PVC](Матовые,Глянцевые,Сатиновые,Фактурные)
  WithBacklight, // С подсветкой(Парящие,Световые линии,Контурные,Световые линии SLOTT,Световые линии Flexy, Подсветка через полотно)

  Premium, // Премиум/Эксклюзивные потолки(Теневые,Бесщелевые,С фотопечатью,Двухуровневые,Звездное небо)
  ByPremises, // По типу помещений(На кухню[kitchen], В коридор[corridor],В ванную[bathroom],В спальню[bedroom], В детскую[nursery], В гостиную[living-room], В доме[house])
  // Fabric, // Тканевые(Тканевые,D-Premium,Clipso,Cerutti)
}

export const stretchCeilingsGroupName = {
  [StretchCeilingsGroup.WithBacklight]: 'С подсветкой',
  [StretchCeilingsGroup.ByTexture]: 'По фактуре',
  [StretchCeilingsGroup.Premium]: 'Премиум', // Эксклюзивные потолки
  [StretchCeilingsGroup.ByPremises]: 'По типу помещений',// Пока нет этова раздела
} as const;

// Потолки по по группам
export const stretchCeilingGroupMap: Map<StretchCeilingsGroup, ProductType[]> = new Map([
  [
    StretchCeilingsGroup.ByTexture,
    [ProductType.Matte, ProductType.Glossy, ProductType.Satin, ProductType.Textured, ProductType.Fabric],
  ],
  [
    StretchCeilingsGroup.WithBacklight,
    [
      ProductType.Floating,
      //StretchCeilingsType.LightLines,
      ProductType.Contour,
      ProductType.InternalLighting,

      ProductType.LightLines,
      // TODO потом добавить информацию по этим двум потолкам
      // StretchCeilingsType.LightLinesSlott,
      // StretchCeilingsType.LightLinesFlexy,
    ],
  ],
  [
    StretchCeilingsGroup.Premium,
    [
      ProductType.ShadowKRAAB,
      // ProductType.Gapless,
      ProductType.PhotoPrinting,
      ProductType.TwoTiered,
      // ProductType.MultiLevel,
      ProductType.StarrySky,
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
