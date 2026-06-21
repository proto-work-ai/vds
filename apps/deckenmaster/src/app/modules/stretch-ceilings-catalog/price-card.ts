import { Component, computed, input } from '@angular/core';
import { IContentType } from '../../model/stretch-ceiling';
import { injectCatalogPrice } from '../../model/price-list-all';
import { PriceUnit } from '../../model/price-list.service';

export function unitFormatter(unit: PriceUnit) {
  switch (unit) {
    case PriceUnit.M2:
      return 'м²';
    case PriceUnit.Things:
      return 'шт.';
    case PriceUnit.Point:
      return 'точка';
    case PriceUnit.LinearMeter:
      return 'м.пог.';
    case PriceUnit.Service:
      return 'Разовая оплата';
    default:
      return '';
  }
}

@Component({
  selector: 'app-price-card',
  template: `
    @switch (size()) {
      @case ('s') {
        <div class="flex gap-1 justify-end">
          @if (priceText()) {
            <div class="text-sm">Цена:</div>
          }
          <div class="text-sm">
            <span class="font-semibold">{{ price() }} </span>
            руб/{{ unitFormat() }}
          </div>
        </div>
      }
      @default {
        <section class="flex flex-col gap-1">
          @if (priceText()) {
            <div class="text-sm">Цена:</div>
          }
          <div class="text-xl">
            <span class="font-semibold">{{ price() }} </span>
            руб/{{ unitFormat() }}
            <!-- <span class="asterisk">*</span> -->
          </div>
          <small> *Цена указана c установкой под ключ. </small>
        </section>
      }
    }
  `,
})
export class PriceCard {
  readonly priceText = input<boolean>(true);
  readonly size = input.required<'s' | 'm' | 'l'>();
  readonly item = input.required<IContentType>();
  readonly itemPrice = input<number | undefined>(undefined);

  protected readonly minPrice = injectCatalogPrice();

  private readonly dataType = computed(() => this.minPrice(this.item().types));
  protected readonly price = computed(() => this.itemPrice() ?? this.dataType()?.[0]);
  protected readonly unitFormat = computed(() => unitFormatter(this.dataType()?.[1].unit));
}
