/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Pipe, PipeTransform } from '@angular/core';

// Все продукты
export enum ProductTag {
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

export const productTypeName: Partial<Record<ProductTag, string>> = {
  // ПВХ
  [ProductTag.Matte]: 'Матовые',
  [ProductTag.MatteColor]: 'Матовые цветной',
  [ProductTag.Glossy]: 'Глянцевые',
  [ProductTag.GlossyColor]: 'Глянцевые цветной',
  [ProductTag.Satin]: 'Сатиновые',
  [ProductTag.SatinColor]: 'Сатиновые цветной',
  [ProductTag.Textured]: 'Фактурные',

  // Тканевые
  [ProductTag.Fabric]: 'Тканевые',
  [ProductTag.DPremium]: 'D-Premium',
  [ProductTag.Clipso]: 'Clipso',
  [ProductTag.Cerutti]: 'Cerutti',

  // Премиум/Эксклюзивные потолки
  [ProductTag.Gapless]: 'Бесщелевые',
  [ProductTag.PhotoPrinting]: 'С фотопечатью',

  // По типу помещений
  [ProductTag.Kitchen]: 'На кухню',
  [ProductTag.Corridor]: 'В коридор',
  [ProductTag.Bathroom]: 'В ванную',
  [ProductTag.Bedroom]: 'В спальню',
  [ProductTag.Nursery]: 'В детскую',
  [ProductTag.LivingRoom]: 'В гостиную',
  // [StretchCeilingsType.House]: 'В доме',

  // ByDesign[По конструкции]
  [ProductTag.TwoTiered]: 'Двухуровневые',
  [ProductTag.TwoTieredWithBacklight]: 'С подсветкой',
  [ProductTag.TwoTieredWithBacklightNiche]: 'Двухуровневые с подсветкой в нише',
  [ProductTag.MultiLevel]: 'Многоуровневый натяжной потолок',
  [ProductTag.CurvedTransition]: 'Криволинейный переход',
  [ProductTag.DoubleVision]: 'Double Vision',
  [ProductTag.ShadowKRAAB]: 'Теневые',
  [ProductTag.Acoustic]: 'Акустические',

  // С подсветкой
  [ProductTag.Floating]: 'Парящие',
  [ProductTag.Contour]: 'C контурной подсветкой',
  [ProductTag.LightLines]: 'Световые линии',
  [ProductTag.LightLinesSlott]: 'Световые линии SLOTT',
  [ProductTag.LightLinesFlexy]: 'Световые линии Flexy',
  [ProductTag.InternalLighting]: 'C подсветкой внутри',
  [ProductTag.Transparent]: 'Светопрозрачный потоло',
  [ProductTag.WithIlluminationCanvas]: 'С подсветкой через полотно',
  [ProductTag.StarrySky]: 'Звездное небо',

  // [StretchCeilingsType.Lightbox]: 'Лайтбокс',

  // Services
  [ProductTag.DrainingSuspendedCeiling]: 'Слив воды с натяжного потолка',
  [ProductTag.RepairStretchCeilings]: 'Ремонт натяжных потолков',
  [ProductTag.InstallationSuspendedSeiling]: 'Монтаж натяжного потолка',

  // [ProductType.RemovingSlattedCeiling]: 'Демонтаж реечного потолка',
  // [ProductType.RemovingProfile]: 'Демонтаж профиля',
  // [ProductType.PreparingSubCeiling]: 'Подготовка чернового потолка работа',
} as const;

@Pipe({ name: 'productTagName' })
export class ProductTagNamePipe implements PipeTransform {
  transform(type?: ProductTag) {
    return type && productTypeName[type];
  }
}

@Pipe({ name: 'thicknessFormat' })
export class ThicknessFormatPipe implements PipeTransform {
  private format(thickness: number | number[]): string {
    if (Array.isArray(thickness)) {
      if (thickness.length > 1) {
        return `от ${thickness[0]} до ${thickness[1]}`;
      } else if (thickness.length === 1) {
        return `от ${thickness}`;
      }
    }
    return thickness + '';
  }

  transform(thickness: number | number[], unit = false): string {
    return this.format(thickness) + (unit ? ' мм' : '');
  }
}

@Pipe({ name: 'priceFormat' })
export class PriceFormatPipe implements PipeTransform {
  transform(price: number | number[]) {
    if (Array.isArray(price)) {
      if (price.length > 1) {
        return `от ${price[0]} до ${price[1]} руб`;
      } else if (price.length === 1) {
        return `от ${price} руб`;
      }
    }
    return `${price} руб`;
  }
}
