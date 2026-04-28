import { Component, computed, input } from '@angular/core';
import { IStretchCeiling } from '../../../model/stretch-ceilings.data';
import { PriceCard } from '../price-card';

@Component({
  selector: 'app-stretch-ceilings-catalog-card',
  templateUrl: './stretch-ceilings-catalog-card.html',
  styleUrls: ['./stretch-ceilings-catalog-card.scss'],
  imports: [PriceCard],
})
export class StretchCeilingsCatalogCard {
  readonly item = input.required<IStretchCeiling>();
  protected readonly title = computed(() => this.item().title);
  protected readonly brief = computed(() => this.item().brief);
}
