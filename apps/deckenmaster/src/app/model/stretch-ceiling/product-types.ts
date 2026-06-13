// Все продукты
export enum ProductType {
  // ПВХ
  // PVC = 1, // ПВХ
  Textured = 1, // Фактурные

  Matte, // Матовые
  MatteColor, // Матовые Цветной

  Glossy, // Глянцевые
  GlossyColor, // Глянцевые Цветной*
  GalaxyGlossyColor, // Галактика Глянцевые Цветной*

  Satin, // Сатиновые(белый)*
  SatinColor, // Сатиновые(цветной)*

  // Тканевые
  Fabric, // Тканевые,
  DPremium, // D-Premium,*
  Clipso, // Clipso,*
  Cerutti, // Cerutti*

  // [По типу помещений]/[По применению]
  Kitchen, // На кухню
  Corridor, // В коридор
  Bathroom, // В ванную
  Bedroom, // В спальню
  Nursery, //  В детскую
  LivingRoom, //  В гостиную
  House, //  В доме

  // С подсветкой
  Floating, // Парящие
  Contour, // C контурной подсветкой

  LightLines, // Световые линии
  LightLinesSlott, // Световые линии SLOTT*
  LightLinesFlexy, // Световые линии Flexy*

  InternalLighting, // Потолки с подсветкой внутри
  // Lightbox, // Лайтбокс*
  // С точечными светильниками
  // Парящий
  // С подсветкой по периметру

  // [Премиум]/[Эксклюзивные потолки]
  ShadowKRAAB, // Теневые,
  Gapless, // Бесщелевые KRAAB,
  PhotoPrinting, // С фотопечатью

  TwoTiered, // Двухуровневые натяжные потолки
  TwoTieredWithBacklight, // Двухуровневые с подсветкой
  TwoTieredWithBacklightNiche, // Двухуровневые с подсветкой в нише

  CurvedTransition, // Криволинейный переход
  MultiLevel, // Многоуровневые
  StarrySky, // Акустические
  Acoustic, // Звездное небо
  DoubleVision, // Double Vision,
  Transparent, // Светопрозрачный,
  WithIlluminationCanvas, // С подсветкой через полотно,

  // Services
  InstallationSuspendedSeiling, // Монтаж натяжного потолка

  RepairStretchCeilings, // Ремонт натяжных потолков

  DrainingSuspendedCeiling, // Слив воды с натяжного потолка

  // Демонтаж натяжного потолка
  RemovingSlattedCeiling, // Демонтаж реечного потолка
  RemovingProfile, // Демонтаж профиля
  PreparingSubCeiling, // Подготовка чернового потолка работа
}

export const productTypeName: Partial<Record<ProductType, string>> = {
  // ПВХ
  [ProductType.Matte]: 'Матовые',
  [ProductType.MatteColor]: 'Матовые цветной',
  [ProductType.Glossy]: 'Глянцевые цветной',
  [ProductType.GlossyColor]: 'Глянцевые',
  [ProductType.Satin]: 'Сатиновые',
  [ProductType.SatinColor]: 'Сатиновые цветной',
  [ProductType.Textured]: 'Фактурные',

  // Тканевые
  [ProductType.Fabric]: 'Тканевые',
  [ProductType.DPremium]: 'D-Premium',
  [ProductType.Clipso]: 'Clipso',
  [ProductType.Cerutti]: 'Cerutti',

  // Премиум/Эксклюзивные потолки
  [ProductType.Gapless]: 'Бесщелевые',
  [ProductType.PhotoPrinting]: 'С фотопечатью',

  // По типу помещений
  [ProductType.Kitchen]: 'На кухню',
  [ProductType.Corridor]: 'В коридор',
  [ProductType.Bathroom]: 'В ванную',
  [ProductType.Bedroom]: 'В спальню',
  [ProductType.Nursery]: 'В детскую',
  [ProductType.LivingRoom]: 'В гостиную',
  // [StretchCeilingsType.House]: 'В доме',

  // ByDesign[По конструкции]
  [ProductType.TwoTiered]: 'Двухуровневые',
  [ProductType.TwoTieredWithBacklight]: 'С подсветкой',
  [ProductType.TwoTieredWithBacklightNiche]: 'Двухуровневые с подсветкой в нише',
  [ProductType.MultiLevel]: 'Многоуровневый натяжной потолок',
  [ProductType.CurvedTransition]: 'Криволинейный переход',
  [ProductType.DoubleVision]: 'Double Vision',
  [ProductType.ShadowKRAAB]: 'Теневые',
  [ProductType.Acoustic]: 'Акустические',

  // С подсветкой
  [ProductType.Floating]: 'Парящие',
  [ProductType.Contour]: 'C контурной подсветкой',
  [ProductType.LightLines]: 'Световые линии',
  [ProductType.LightLinesSlott]: 'Световые линии SLOTT',
  [ProductType.LightLinesFlexy]: 'Световые линии Flexy',
  [ProductType.InternalLighting]: 'C подсветкой внутри',
  [ProductType.Transparent]: 'Светопрозрачный потоло',
  [ProductType.WithIlluminationCanvas]: 'С подсветкой через полотно',
  [ProductType.StarrySky]: 'Звездное небо',

  // [StretchCeilingsType.Lightbox]: 'Лайтбокс',

  // Services
  [ProductType.DrainingSuspendedCeiling]: 'Слив воды с натяжного потолка',
  [ProductType.RepairStretchCeilings]: 'Ремонт натяжных потолков',
  [ProductType.InstallationSuspendedSeiling]: 'Монтаж натяжного потолка',

  // [ProductType.RemovingSlattedCeiling]: 'Демонтаж реечного потолка',
  // [ProductType.RemovingProfile]: 'Демонтаж профиля',
  // [ProductType.PreparingSubCeiling]: 'Подготовка чернового потолка работа',
} as const;
