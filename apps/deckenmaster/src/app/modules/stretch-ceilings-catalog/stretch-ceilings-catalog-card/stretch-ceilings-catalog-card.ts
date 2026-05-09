import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideCircleArrowRight, lucideMoveRight } from '@ng-icons/lucide';
import { IContentType } from '../../../model/products.data';
import { PriceCard } from '../price-card';

@Component({
  selector: 'app-stretch-ceilings-catalog-card',
  templateUrl: './stretch-ceilings-catalog-card.html',
  styleUrls: ['./stretch-ceilings-catalog-card.scss'],
  imports: [PriceCard, NgIcon],
  providers: [provideIcons({ 
    lucideCircleArrowRight,
    lucideMoveRight,
    lucideChevronRight,
   })],
})
export class StretchCeilingsCatalogCard {
  readonly item = input.required<IContentType>();
  readonly link = input<boolean>(false);
  protected readonly title = computed(() => this.item().title);
  protected readonly brief = computed(() => this.item().brief);
}
