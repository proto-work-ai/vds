/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideChartPie,
  lucideChevronDown,
  lucideChevronRight,
  lucideChevronUp,
  lucideEllipsis,
  lucideFrame,
  lucideHouse,
  lucideInbox,
  lucideLifeBuoy,
  lucideMap,
  lucideSearch,
  lucideSend,
  lucideSettings,
  lucideCode,
  lucideTable2,
} from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { AsyncPipe } from '@angular/common';
import { inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiLoader, TuiRoot, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiComboBox, TuiDataListWrapper } from '@taiga-ui/kit';
import { debounceTime, filter, of, shareReplay, startWith, switchMap, tap } from 'rxjs';

import { DatabaseServer } from './data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-server-side-filtering',
  styleUrl: 'server-side-filtering.component.scss',
  templateUrl: 'server-side-filtering.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmSidebarImports,
    HlmDropdownMenuImports,
    HlmCollapsibleImports,
    BrnSelectImports,
    HlmSelectImports,
    TuiTextfield,
    TuiDataListWrapper,
    ReactiveFormsModule,
    FormsModule,
    TuiChevron,
    TuiComboBox,
    TuiLoader,
    TuiRoot,
  ],
  providers: [
    provideIcons({
      lucideHouse,
      lucideInbox,
      lucideCalendar,
      lucideSearch,
      lucideSettings,
      lucideChevronDown,
      lucideLifeBuoy,
      lucideSend,

      lucideFrame,
      lucideChartPie,
      lucideMap,
      lucideEllipsis,
      lucideChevronRight,
      lucideCode,
      lucideTable2,
      lucideChevronUp,
    }),
  ],
})
export class ServerSideFiltering {
  private readonly destroyRef = inject(DestroyRef);
  private readonly service = inject(DatabaseServer);

  protected readonly showLoader = signal(false);
  // Click on cleaner / datalist item triggers (input) events too
  protected readonly searchControl: FormControl<string> = new FormControl();
  protected readonly items = signal([]);
  protected value: string | null = null;

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(0),
        filter((value) => !!value),
        tap(() => this.showLoader.set(true)),
        debounceTime(300),
        switchMap((query) => {
          return query.length >= 2 ? this.service.search(query) : of(undefined);
        }),
        tap(() => this.showLoader.set(false)),
        tap((items) => this.items.set(items as any)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
