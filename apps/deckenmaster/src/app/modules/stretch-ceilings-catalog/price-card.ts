import { Component, computed, input } from '@angular/core';
import { IStretchCeiling } from '../../model/stretch-ceilings.data';
import { injectCatalogPrice } from '../../model/price-list-all';
import { Unit } from '../../model/price-list.service';

export function unitFormatter(unit: Unit) {
  switch (unit) {
    case Unit.M2:
      return 'м²';
    case Unit.Things:
      return 'шт.';
    case Unit.Point:
      return 'точка';
    case Unit.LinearMeter:
      return 'м.пог.';
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
          <div class="text-sm">Цена:</div>
          <div class="text-sm">
            от
            <span class="font-semibold">{{ price() }} </span>
            руб/{{ unitFormat() }}
          </div>
        </div>
      }
      @default {
        <section class="flex flex-col gap-1">
          <div class="title">Цена</div>
          <div class="text-xl">
            от
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
  readonly size = input.required<'s' | 'm' | 'l'>();
  readonly item = input.required<IStretchCeiling>();
  protected readonly minPrice = injectCatalogPrice();

  private readonly dataType = computed(() => {
    const types = this.item().types;
    return this.minPrice(types);
  });

  protected readonly price = computed(() => this.dataType()?.[0]);
  protected readonly unitFormat = computed(() => unitFormatter(this.dataType()?.[1].unit));
}
