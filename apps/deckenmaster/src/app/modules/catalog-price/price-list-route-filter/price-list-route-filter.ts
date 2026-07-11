import { Component, DestroyRef, inject, input, signal, effect, OnInit } from '@angular/core';
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
import { IAppMenuItem } from '../../../shared/menu';
import { injectRouteParam } from '../../../shared/inject-route-param';
import { startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class PriceListRouteFilter implements OnInit {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly routeCategory = injectRouteParam('category');
  protected readonly activeItemIndex = signal<number>(0);

  public readonly groups = input.required<Pick<IAppMenuItem, 'title' | 'queryParams' | 'link' | 'fragment'>[]>();
  public readonly queryParam = input<string>('category');

  ngOnInit() {
    this.route.queryParams
      .pipe(
        startWith(this.route.snapshot.queryParams),
        tap((params) => {
          const index = this.groups()
            .map((a) => a?.queryParams)
            .findIndex((param) => params[this.queryParam()] == param?.[this.queryParam()]);

          if (index >= 0) {
            this.activeItemIndex.set(index);
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
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
