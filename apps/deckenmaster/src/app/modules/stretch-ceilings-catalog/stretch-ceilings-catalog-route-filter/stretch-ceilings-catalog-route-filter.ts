import { Component, DestroyRef, inject, input, signal, OnInit } from '@angular/core';
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
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideChevronDown, lucideSquareArrowOutUpRight } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { ScrollLink } from '../../../components/scroll-link/scroll-link.directive';
import { injectScrollToElement } from '../../../components/scroll-link/scroll.service';
import { FormImports } from '../../../components/form';

@Component({
  selector: 'app-sc-catalog-route-filter',
  templateUrl: 'stretch-ceilings-catalog-route-filter.html',
  styleUrl: 'stretch-ceilings-catalog-route-filter.scss',
  imports: [
    TuiTabs,
    TuiIcon,
    FormImports,
  ],
  providers: [
    provideIcons({
      lucideSquareArrowOutUpRight,
    }),
  ],
})
export class SCCatalogRouteFilter implements OnInit {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly minRange = signal(5);
  protected readonly maxRange = signal(150);
  protected readonly ticksLabels = signal([this.minRange(), 50, 75, 100, this.maxRange()].map((a) => a + 'м²'));
  private readonly scrollTo = injectScrollToElement();

  public readonly groups = input.required<Pick<IAppMenuItem, 'title' | 'queryParams' | 'link' | 'fragment'>[]>();

  protected readonly activeItemIndex = signal<number>(0);

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        tap((params) => {
          const { group } = params;
          if (group) {
            const index = this.groups().findIndex((a) => a?.queryParams?.['group'] == group);
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
    const item = this.groups()[index];
    const queryParams = item?.queryParams ?? 0;
    if (item?.link) {
      this.router.navigate(item?.link as any, {
        queryParams: item.queryParams ?? {},
        fragment: item.fragment,
        // queryParamsHandling: 'merge',
      });
      this.scrollTo(item.fragment ? `#${item.fragment}` : undefined);
    } else if (queryParams) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        fragment: item.fragment,
        // queryParamsHandling: 'merge',
      });
      this.scrollTo(item.fragment ? `#${item.fragment}` : undefined);
    }
  }
}
