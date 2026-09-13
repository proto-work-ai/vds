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
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiError, TuiTextfield, TuiDataListComponent, TuiLoader } from '@taiga-ui/core';
import { TuiChevron, TuiComboBox, TuiDataListWrapper, TuiTextarea } from '@taiga-ui/kit';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { injectServiceSearchTest, StringifySetterPipe, VirtualScrollPaginateImports } from '@atlas/core';

@Component({
  selector: 'app-server-side-paging',
  styleUrl: 'server-side-paging.component.scss',
  templateUrl: 'server-side-paging.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmButtonImports,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfield,
    ReactiveFormsModule,
    TuiTextfield,
    TuiChevron,
    TuiComboBox,
    TuiDataListWrapper,
    ScrollingModule,
    VirtualScrollPaginateImports,
    TuiDataListComponent,
    TuiTextarea,
    AsyncPipe,
    NgIcon,
    HlmIcon,
    TuiError,
    TuiLoader,
    StringifySetterPipe,
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
export class ServerSidePaging {
  protected readonly formControl = new FormControl();
  protected readonly serviceSearch = injectServiceSearchTest();
}
