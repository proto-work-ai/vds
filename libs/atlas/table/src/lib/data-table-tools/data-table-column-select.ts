/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  DestroyRef,
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
import {
  FlexRenderDirective,
} from '@tanstack/angular-table';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AtlasDataTableComponent } from '../data-table/data-table';

@Component({
  selector: 'atlas-data-table-column-select',
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
    <brn-select
      class="inline-block"
      placeholder="Columns"
      [multiple]="true"
      [formControl]="selectedColumn"
    >
      <hlm-select-trigger class="w-56">
        <hlm-select-value />
      </hlm-select-trigger>

      <hlm-select-content>
        @for (column of hidableColumns; track column.id) {
        <hlm-option [value]="column.columnDef.id">
          {{ column.columnDef.id }}
        </hlm-option>
        }
      </hlm-select-content>
    </brn-select>
  `,
})
export class AtlasDataTableColumnSelect {
  private readonly destroyRef = inject(DestroyRef);
  private readonly dataTable = inject(AtlasDataTableComponent);
  protected readonly selectedColumn = new FormControl<string[]>([]);

  protected get table() {
    return this.dataTable.table;
  }

  protected readonly hidableColumns = this.table
    .getAllColumns()
    .filter((column) => column.getCanHide());

  constructor(){
    this.selectedColumn.setValue(this.hidableColumns.map((a) => a.id));
    this.selectedColumn.valueChanges
      .pipe(
        filter(Boolean),
        tap((values) => {
          this.hidableColumns.forEach((column) =>
            column.toggleVisibility(values.includes(column.id)),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
