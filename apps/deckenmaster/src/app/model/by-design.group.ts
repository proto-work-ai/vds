import { STUnitPrice, Unit } from './price-list.service';
import { ProductType } from './products.data';

// WithBacklight[с подсветкой]
export const withBacklightGroup: STUnitPrice[] = [
  { type: ProductType.Floating, unit: Unit.LinearMeter, price: 2200 },
  { type: ProductType.Contour, unit: Unit.LinearMeter, price: 900 },
  { type: ProductType.InternalLighting, unit: Unit.LinearMeter, price: 2500 },

  { type: ProductType.LightLines, unit: Unit.LinearMeter, price: [2200] },
  { type: ProductType.LightLinesSlott, unit: Unit.LinearMeter, price: [2200] },
  { type: ProductType.LightLinesFlexy, unit: Unit.LinearMeter, price: 4000 },

  // {
  //   type: StretchCeilingsType.Clipso,
  //   unit: Unit.LinearMeter,
  //   price: 650,
  // },
  { type: ProductType.ShadowKRAAB, unit: Unit.LinearMeter, price: 1400 },
  { type: ProductType.Transparent, unit: Unit.LinearMeter, price: 4500 },
  // {  type: StretchCeilingsType.Clipso, unit: Unit.LinearMeter, price: 1000 },
  { type: ProductType.WithIlluminationCanvas, unit: Unit.LinearMeter, price: 1000 },
  { type: ProductType.StarrySky, unit: Unit.M2, price: 16000 },
] as const;

// ByDesign[По конструкции]
export const byDesignGroup: STUnitPrice[] = [
  { type: ProductType.TwoTiered, unit: Unit.LinearMeter, price: 2000 },
  { type: ProductType.TwoTieredWithBacklight, unit: Unit.LinearMeter, price: 2500 },
  { type: ProductType.TwoTieredWithBacklightNiche, unit: Unit.LinearMeter, price: 2500 },
  { type: ProductType.MultiLevel, unit: Unit.LinearMeter, price: 2000 },
  { type: ProductType.CurvedTransition, unit: Unit.LinearMeter, price: 1500 },
  { type: ProductType.DoubleVision, unit: Unit.M2, price: 1500 },
  // {  type: StretchCeilingsType.Clipso, unit: Unit.LinearMeter, price: 1500 },
  { type: ProductType.ShadowKRAAB, unit: Unit.LinearMeter, price: 1400 },
  { type: ProductType.WithPhotoPrinting, unit: Unit.M2, price: 2500 },
  // {  type: StretchCeilingsType.Clipso, unit: Unit.M2, price: 3500 },
  { type: ProductType.Acoustic, unit: Unit.M2, price: 2800 },
  { type: ProductType.StarrySky, unit: Unit.M2, price: 16000 },
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
