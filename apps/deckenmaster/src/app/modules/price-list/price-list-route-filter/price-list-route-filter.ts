import { Component, DestroyRef, inject, input, signal, OnInit, effect } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiNumberFormat, TuiTextfield } from '@taiga-ui/core';
import {
  TuiChevron,
  TuiDataListWrapper,
  TuiInputNumber,
  TuiInputRange,
  TuiInputSlider,
  TuiSelect,
  TuiTabs,
} from '@taiga-ui/kit';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { IAppMenuItem } from '../../../shared/menu';
import { injectRouteParam } from '../../../shared/inject-route-param';

@Component({
  selector: 'app-price-list-route-filter',
  templateUrl: 'price-list-route-filter.html',
  styleUrl: 'price-list-route-filter.scss',
  imports: [
    TuiDataListWrapper,
    TuiSelect,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInputRange,
    TuiInputSlider,
    FormsModule,
    TuiInputNumber,
    TuiTabs,
    TuiTextfield,
    TuiIcon,
    RouterLink,
    TuiButton,
    TuiNumberFormat,
    TuiChevron,
  ],
})
export class PriceListRouteFilter {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  protected readonly routeCategory = injectRouteParam('category');

  public readonly groups = input.required<Pick<IAppMenuItem, 'title' | 'queryParams' | 'link' | 'fragment'>[]>();

  protected readonly activeItemIndex = signal<number>(0);

  constructor() {
    effect(() => {
      const groups = this.groups();
      const category = this.routeCategory();
      if (category) {
        const index = groups.findIndex((a) => a?.queryParams?.['category'] == category);
        if (index >= 0) {
          this.activeItemIndex.set(index);
        }
      }
    });
  }

  protected indexChange(index: number): void {
    const item = this.groups()[index];
    const queryParams = item?.queryParams ?? 0;
    if (item?.link) {
      this.router.navigate(item?.link as any, {
        queryParams: item.queryParams ?? {},
        fragment: item.fragment,
        // queryParamsHandling: 'merge',
      });
    } else if (queryParams) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        fragment: item.fragment,
        // queryParamsHandling: 'merge',
      });
    }
  }
}
