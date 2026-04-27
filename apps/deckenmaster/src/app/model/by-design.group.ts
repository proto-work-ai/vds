import { STUnitPrice, Unit } from './price-list.service';
import { StretchCeilingsType } from './stretch-ceilings.data';

// WithBacklight[с подсветкой]
export const withBacklightGroup: STUnitPrice[] = [
  { type: StretchCeilingsType.Floating, unit: Unit.LinearMeter, price: 2200 },
  { type: StretchCeilingsType.Contour, unit: Unit.LinearMeter, price: 900 },
  { type: StretchCeilingsType.InternalLighting, unit: Unit.LinearMeter, price: 2500 },
  { type: StretchCeilingsType.LightLinesSlott, unit: Unit.LinearMeter, price: [2200] },
  { type: StretchCeilingsType.LightLinesFlexy, unit: Unit.LinearMeter, price: 4000 },

  // {
  //   type: StretchCeilingsType.Clipso,
  //   unit: Unit.LinearMeter,
  //   price: 650,
  // },
  { type: StretchCeilingsType.ShadowKRAAB, unit: Unit.LinearMeter, price: 1400 },
  { type: StretchCeilingsType.Transparent, unit: Unit.LinearMeter, price: 4500 },
  // {  type: StretchCeilingsType.Clipso, unit: Unit.LinearMeter, price: 1000 },
  { type: StretchCeilingsType.WithIlluminationCanvas, unit: Unit.LinearMeter, price: 1000 },
  { type: StretchCeilingsType.StarrySky, unit: Unit.M2, price: 16000 },
] as const;

// ByDesign[По конструкции]
export const byDesignGroup: STUnitPrice[] = [
  { type: StretchCeilingsType.TwoTiered, unit: Unit.LinearMeter, price: 2000 },
  { type: StretchCeilingsType.TwoTieredWithBacklight, unit: Unit.LinearMeter, price: 2500 },
  { type: StretchCeilingsType.TwoTieredWithBacklightNiche, unit: Unit.LinearMeter, price: 2500 },
  { type: StretchCeilingsType.MultiLevel, unit: Unit.LinearMeter, price: 2000 },
  { type: StretchCeilingsType.CurvedTransition, unit: Unit.LinearMeter, price: 1500 },
  { type: StretchCeilingsType.DoubleVision, unit: Unit.M2, price: 1500 },
  // {  type: StretchCeilingsType.Clipso, unit: Unit.LinearMeter, price: 1500 },
  { type: StretchCeilingsType.ShadowKRAAB, unit: Unit.LinearMeter, price: 1400 },
  { type: StretchCeilingsType.WithPhotoPrinting, unit: Unit.M2, price: 2500 },
  // {  type: StretchCeilingsType.Clipso, unit: Unit.M2, price: 3500 },
  { type: StretchCeilingsType.Acoustic, unit: Unit.M2, price: 2800 },
  { type: StretchCeilingsType.StarrySky, unit: Unit.M2, price: 16000 },
] as const;

export enum StretchCeilingsByDesign {
  Backlit, // С подстветкой,
  LightLines, // Световые линии,
  Shadow, // Теневой,
  MultiLevel, // Многоуровневые,
  Gapless, // Бесщелевой,
  Floating, // Парящий
  StarrySky, // Звездное небо,
}
