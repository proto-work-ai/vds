import { STUnitPrice, PriceUnit } from '../price-list.service';
import { ProductTag } from '.';

// WithBacklight[с подсветкой]
export const withBacklightGroup: STUnitPrice[] = [
  { type: ProductTag.Floating, unit: PriceUnit.LM, price: 2200 },
  { type: ProductTag.Contour, unit: PriceUnit.LM, price: 900 },
  { type: ProductTag.InternalLighting, unit: PriceUnit.LM, price: 2490 },

  { type: ProductTag.LightLines, unit: PriceUnit.LM, price: [2200] },
  { type: ProductTag.LightLinesSlott, unit: PriceUnit.LM, price: [2200] },
  { type: ProductTag.LightLinesFlexy, unit: PriceUnit.LM, price: 4000 },

  // {
  //   type: StretchCeilingsType.Clipso,
  //   unit: Unit.LinearMeter,
  //   price: 650,
  // },
  { type: ProductTag.ShadowKRAAB, unit: PriceUnit.LM, price: 1400 },
  { type: ProductTag.Transparent, unit: PriceUnit.LM, price: 4500 },
  // {  type: StretchCeilingsType.Clipso, unit: Unit.LinearMeter, price: 1000 },
  { type: ProductTag.WithIlluminationCanvas, unit: PriceUnit.LM, price: 1000 },
  { type: ProductTag.StarrySky, unit: PriceUnit.M2, price: 16000 },

  { type: ProductTag.PhotoPrinting, unit: PriceUnit.M2, price: 1100 },
] as const;

// ByDesign[По конструкции]
export const byDesignGroup: STUnitPrice[] = [
  { type: ProductTag.TwoTiered, unit: PriceUnit.LM, price: 2000 },
  { type: ProductTag.TwoTieredWithBacklight, unit: PriceUnit.LM, price: 2490 },
  { type: ProductTag.TwoTieredWithBacklightNiche, unit: PriceUnit.LM, price: 2490 },
  { type: ProductTag.MultiLevel, unit: PriceUnit.LM, price: 2000 },
  { type: ProductTag.CurvedTransition, unit: PriceUnit.LM, price: 1500 },
  { type: ProductTag.DoubleVision, unit: PriceUnit.M2, price: 1500 },
  // {  type: StretchCeilingsType.Clipso, unit: Unit.LinearMeter, price: 1500 },
  { type: ProductTag.ShadowKRAAB, unit: PriceUnit.LM, price: 1400 },
  { type: ProductTag.PhotoPrinting, unit: PriceUnit.M2, price: 2490 },
  // {  type: StretchCeilingsType.Clipso, unit: Unit.M2, price: 3500 },
  { type: ProductTag.Acoustic, unit: PriceUnit.M2, price: 2800 },
  { type: ProductTag.StarrySky, unit: PriceUnit.M2, price: 16000 },

  { type: ProductTag.PhotoPrinting, unit: PriceUnit.M2, price: 1100 },
] as const;

// export enum StretchCeilingsByDesign {
//   Backlit, // С подстветкой,
//   LightLines, // Световые линии,
//   Shadow, // Теневой,
//   MultiLevel, // Многоуровневые,
//   Gapless, // Бесщелевой,
//   Floating, // Парящий
//   StarrySky, // Звездное небо,
// }
