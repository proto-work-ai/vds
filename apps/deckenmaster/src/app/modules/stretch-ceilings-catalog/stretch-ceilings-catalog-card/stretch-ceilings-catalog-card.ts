import { Component, input } from '@angular/core';
import { IStretchCeiling } from '../../../model/stretch-ceilings.data';

@Component({
  selector: 'app-stretch-ceilings-catalog-card',
  templateUrl: './stretch-ceilings-catalog-card.html',
  styleUrls: ['./stretch-ceilings-catalog-card.scss'],
})
export class StretchCeilingsCatalogCard {
  readonly item = input.required<IStretchCeiling>();
}
