import { Component, computed, DestroyRef, inject, input, Signal, signal } from '@angular/core';
import { injectStretchCeilingsCatalog, stretchCeilingGroupMap } from '../../../model/stretch-ceilings.service';
import { StretchCeilingsCatalogCard } from '../stretch-ceilings-catalog-card/stretch-ceilings-catalog-card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { routePath } from '../../../app.routes';
import { injectRouteParam } from '../../../shared/inject-toute-param';
import { StretchCeilingsCatalogRouteFilter } from '../../../components/stretch-ceilings-catalog-route-filter/stretch-ceilings-catalog-route-filter';

@Component({
  selector: 'app-stretch-ceilings-catalog-all',
  templateUrl: './stretch-ceilings-catalog-all.html',
  styleUrls: ['./stretch-ceilings-catalog-all.scss'],
  imports: [StretchCeilingsCatalogCard, RouterLink, StretchCeilingsCatalogRouteFilter],
})
export class StretchCeilingsCatalogAll {
  readonly title = input('Каталог натяжных потолков');
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly route = inject(ActivatedRoute);
  protected readonly routePath = routePath;
  private readonly items = injectStretchCeilingsCatalog();
  protected readonly groupParam = injectRouteParam('group');
  protected readonly filtered = computed(() => {
    const items = this.items();
    const group = this.groupParam()!;
    const types = stretchCeilingGroupMap.get(+group);
    if (types) {
      return items.filter((a) => new Set([...types, ...a.types]).size < types.length + a.types.length);
    } else {
      return items;
    }
  });
}
