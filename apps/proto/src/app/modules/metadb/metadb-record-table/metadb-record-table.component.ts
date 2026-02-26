/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { RouterOutlet } from '@angular/router';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { ColumnDef, flexRenderComponent } from '@tanstack/angular-table';
import {
  AtlasDataTableComponent,
  AtlasDataTableComponents,
  Payment,
} from '../../atlas/data-table/data-table';
import {
  TableHeadSelection,
  TableRowSelection,
} from '../../atlas/data-table/selection-column';
import { TableHeadSortButton } from '../../atlas/data-table/sort-header-button';
import { ActionDropdown } from '../../atlas/data-table/action-dropdown';

@Component({
  selector: 'proto-metadb-record-table',
  templateUrl: './metadb-record-table.component.html',
  styleUrls: ['./metadb-record-table.component.scss'],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
    }),
  ],
  imports: [
    HlmSidebarImports,
    HlmIconImports,
    HlmButtonImports,
    HlmIconImports,
    AtlasDataTableComponents,
    NgIcon,
    RouterOutlet,
  ],
})
export class MetadbRecordsComponent {}
