/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  OnInit,
  inject,
  DestroyRef,
  input,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { hlmMuted } from '@spartan-ng/helm/typography';
import {
  type ColumnDef,
  type ColumnFiltersState,
  createAngularTable,
  flexRenderComponent,
  FlexRenderDirective,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  Table,
  type VisibilityState,
} from '@tanstack/angular-table';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AtlasDataTableComponent } from '../data-table/data-table';
import { columns } from '../../../../../../proto-storybook/src/app/modules/table/column-grouping-table/columns';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};
@Component({
  selector: 'atlas-data-table-filter',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlexRenderDirective,
    FormsModule,
    HlmDropdownMenuImports,
    HlmButtonImports,
    NgIcon,
    HlmIconImports,
    HlmInputImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmTableImports,
    ReactiveFormsModule,
  ],
  providers: [provideIcons({ lucideChevronDown })],
  template: `
    <input
      hlmInput
      class="w-full md:w-80"
      placeholder="Filter emails..."
      (input)="filterChanged($event)"
    />
  `,
})
export class AtlasDataTableFilter {
  private readonly destroyRef = inject(DestroyRef);
  private readonly dataTable = inject(AtlasDataTableComponent);

  protected get table() {
    return this.dataTable.table();
  }

  readonly columnName = input.required<string>();

  protected filterChanged(event: Event) {
    this.table
      .getColumn(this.columnName())
      ?.setFilterValue((event.target as HTMLInputElement).value);
  }
}
