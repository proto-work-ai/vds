import { STUnitPrice, PriceUnit } from '../price-list.service';
import { ProductType } from '.';

// WithBacklight[с подсветкой]
export const withBacklightGroup: STUnitPrice[] = [
  { type: ProductType.Floating, unit: PriceUnit.LM, price: 2200 },
  { type: ProductType.Contour, unit: PriceUnit.LM, price: 900 },
  { type: ProductType.InternalLighting, unit: PriceUnit.LM, price: 2490 },

  { type: ProductType.LightLines, unit: PriceUnit.LM, price: [2200] },
  { type: ProductType.LightLinesSlott, unit: PriceUnit.LM, price: [2200] },
  { type: ProductType.LightLinesFlexy, unit: PriceUnit.LM, price: 4000 },

  // {
  //   type: StretchCeilingsType.Clipso,
  //   unit: Unit.LinearMeter,
  //   price: 650,
  // },
  { type: ProductType.ShadowKRAAB, unit: PriceUnit.LM, price: 1400 },
  { type: ProductType.Transparent, unit: PriceUnit.LM, price: 4500 },
  // {  type: StretchCeilingsType.Clipso, unit: Unit.LinearMeter, price: 1000 },
  { type: ProductType.WithIlluminationCanvas, unit: PriceUnit.LM, price: 1000 },
  { type: ProductType.StarrySky, unit: PriceUnit.M2, price: 16000 },

  { type: ProductType.PhotoPrinting, unit: PriceUnit.M2, price: 1100 },
] as const;

// ByDesign[По конструкции]
export const byDesignGroup: STUnitPrice[] = [
  { type: ProductType.TwoTiered, unit: PriceUnit.LM, price: 2000 },
  { type: ProductType.TwoTieredWithBacklight, unit: PriceUnit.LM, price: 2490 },
  { type: ProductType.TwoTieredWithBacklightNiche, unit: PriceUnit.LM, price: 2490 },
  { type: ProductType.MultiLevel, unit: PriceUnit.LM, price: 2000 },
  { type: ProductType.CurvedTransition, unit: PriceUnit.LM, price: 1500 },
  { type: ProductType.DoubleVision, unit: PriceUnit.M2, price: 1500 },
  // {  type: StretchCeilingsType.Clipso, unit: Unit.LinearMeter, price: 1500 },
  { type: ProductType.ShadowKRAAB, unit: PriceUnit.LM, price: 1400 },
  { type: ProductType.PhotoPrinting, unit: PriceUnit.M2, price: 2490 },
  // {  type: StretchCeilingsType.Clipso, unit: Unit.M2, price: 3500 },
  { type: ProductType.Acoustic, unit: PriceUnit.M2, price: 2800 },
  { type: ProductType.StarrySky, unit: PriceUnit.M2, price: 16000 },

  { type: ProductType.PhotoPrinting, unit: PriceUnit.M2, price: 1100 },
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
