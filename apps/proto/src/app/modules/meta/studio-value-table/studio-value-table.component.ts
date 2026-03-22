/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideLayersPlus,
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
  lucideChevronDown,
  lucideTrash,
  lucidePencil,
} from '@ng-icons/lucide';
import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { TuiDialogService } from '@taiga-ui/experimental';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { tap } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AtlasDataTableComponents } from '@atlas/table';
import { AtlasDataTableToggleSize } from '@atlas/table';
import { AtlasTaigaUiTable } from '@atlas/table';
import { AtlasTablePaginatePipe } from '@atlas/table';
import { ColumnAttributeTable, PaginationOptions } from '@atlas/core';
import {
  attrMetaEntityDescription,
  attrMetaEntityDisable,
  attrMetaEntityReadonly,
  attrMetaEntityTitle,
} from '../studio-attribute/studio-entity.attributes';

import { MetaValue } from '@metadb/client';
import { ValueEditModal, ValueEditModalData } from './value-edit-modal/value-edit-modal';
import { MetaValueService } from '../services/studio-value.service';
import { attributeColumnMenu } from '../attribute/column-checked.attributes';

@Component({
  selector: 'proto-studio-values',
  templateUrl: './studio-value-table.component.html',
  styleUrls: ['./studio-value-table.component.scss'],
  imports: [
    HlmSidebarImports,
    HlmIconImports,
    HlmButtonImports,
    HlmIconImports,
    HlmDropdownMenuImports,
    HlmButtonImports,
    HlmIconImports,
    HlmInputImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmTableImports,
    AtlasDataTableComponents,
    FormsModule,
    NgIcon,
    ReactiveFormsModule,
    AtlasTaigaUiTable,
    AtlasDataTableToggleSize,
    AtlasTablePaginatePipe,
  ],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
      lucideChevronDown,
      lucideLayersPlus,
      lucideTrash,
      lucidePencil,
    }),
  ],
})
export class StudioValuesComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogService = inject(TuiDialogService);
  protected readonly valueService = inject(MetaValueService);
  protected readonly columns = signal<ColumnAttributeTable[]>([
    attrMetaEntityTitle,
    attrMetaEntityDescription,
    attrMetaEntityDisable,
    attrMetaEntityReadonly,
    this.getColumnMenu(),
  ]);
  private readonly tableRef = viewChild(AtlasTaigaUiTable);

  protected readonly valueServiceAll = signal((options: PaginationOptions) => this.valueService.getAll(options));

  protected readonly tablePaginate = signal<PaginationOptions>({ limit: 10, page: 1, includePageCount: true });

  protected openEditModal(model?: MetaValue): void {
    this.dialogService
      .open<string>(new PolymorpheusComponent(ValueEditModal), {
        label: model ? 'Edit Value' : 'Create Value',
        size: 'm',
        data: { model } satisfies ValueEditModalData,
      })
      .pipe(
        tap((result) => {
          if (result) {
            this.alerts.open('Alert');
            this.tableRefresh();
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected removeBy(data: MetaValue) {
    this.valueService
      .delete(data)
      .pipe(
        tap(() => this.tableRefresh()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private getColumnMenu(): ColumnAttributeTable {
    return attributeColumnMenu([
      {
        title: 'Edit Row',
        icon: 'lucidePencil',
        iconClass: 'text-gray-500',
        onClick: (data: MetaValue) => {
          this.openEditModal(data);
        },
      },
      {
        title: 'Remove Row',
        icon: 'lucideTrash',
        iconClass: 'text-red-500',
        onClick: (data: MetaValue) => this.removeBy(data),
      },
    ]);
  }

  private tableRefresh(): void {
    this.tableRef()!.refresh();
  }
}
