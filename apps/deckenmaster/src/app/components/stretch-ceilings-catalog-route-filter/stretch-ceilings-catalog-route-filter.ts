/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { injectStretchCeilingGroupMenu } from '../../model/stretch-ceilings.service';
import { IAppMenuItem } from '../../shared/menu';

@Component({
  selector: 'app-stretch-ceilings-catalog-route-filter',
  templateUrl: 'stretch-ceilings-catalog-route-filter.html',
  styleUrl: 'stretch-ceilings-catalog-route-filter.scss',
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
    TuiButton,
    TuiNumberFormat,
    TuiChevron,
  ],
})
export class StretchCeilingsCatalogRouteFilter {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly minRange = signal(5);
  protected readonly maxRange = signal(150);
  protected readonly ticksLabels = signal([this.minRange(), 50, 75, 100, this.maxRange()].map((a) => a + 'м²'));

  protected readonly groups = signal<Pick<IAppMenuItem, 'title' | 'queryParams'>[]>([
    {
      title: 'Все виды',
      queryParams: {},
    },
    // Все кромя "По типу"
    ...injectStretchCeilingGroupMenu().slice(0, 3),
  ]);

  protected readonly activeItemIndex = signal<number>(0);

  constructor() {
    this.route.queryParams
      .pipe(
        tap((params) => {
          const { group } = params;
          if (group) {
            const index = this.groups().findIndex((a) => a?.queryParams?.['group'] === group);
            if (index >= 0) {
              this.activeItemIndex.set(index);
            }
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected indexChange(index: number): void {
    const queryParams = this.groups()[index]?.queryParams ?? 0;
    if (queryParams) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        // queryParamsHandling: 'merge',
      });
    }
  }
}
