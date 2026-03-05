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
import { Component, DestroyRef, inject, signal } from '@angular/core';
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
import { AtlasDataTableComponents } from '../../atlas/data-table/data-table';
import { AtlasDataTableToggleSize } from '../../atlas/data-table-tools/data-table-toggle-size';
import { AtlasTaigaUiTable, ITableColumn, ITablePaginate } from "../../atlas/taiga-ui-table/taiga-ui-table";
import { MetaDbEntityService } from '../services/metadb-entity.service';
import { attributeMetaEntityDescription, attributeMetaEntityDisable, attributeMetaEntityReadonly, attributeMetaEntityTitle } from '../attribute/meta-entity.attributes';
import { MetaEntityModal } from './metadb-entity-modal/metadb-entity-modal';
import { AtlasTablePaginatePipe } from '../../atlas/atlas-table-paginate';
import { attributeColumnMenu } from '../../atlas/attribute/column-checked.attributes';
import { MetaAttribute } from '../../atlas/core/attribute';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

@Component({
  selector: 'proto-metadb-entity-table',
  templateUrl: './metadb-entity-table.component.html',
  styleUrls: ['./metadb-entity-table.component.scss'],
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
export class MetadbEntitiesComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogService = inject(TuiDialogService);
  protected readonly entityService = inject(MetaDbEntityService);
  protected readonly columns = signal<MetaAttribute[]>([
    attributeMetaEntityTitle,
    attributeMetaEntityDescription,
    attributeMetaEntityDisable,
    attributeMetaEntityReadonly,
    attributeColumnMenu([
      {
        title: 'Edit Row',
        icon: 'lucidePencil',
        iconClass: 'text-gray-500',
        onClick: (d) => {
          console.log('onClick', d)
        }
      },
      {
        title: 'Remove Row',
        icon: 'lucideTrash',
        iconClass: 'text-red-500',
        onClick: (d) => {
          console.log('onClick', d)
        }
      },
    ]),
  ]);

  protected readonly entityServiceAll = signal((paginate: ITablePaginate) =>
    this.entityService.getAll(paginate)
  );

  protected readonly tablePaginate = signal<ITablePaginate>({ currentPage: 1, length: 10, pageCount: 10 });

  protected openEditModal(model?: unknown): void {
    this.dialogService
      .open<string>(new PolymorpheusComponent(MetaEntityModal), {
        label: model ? 'Edit Entity' : 'Create Entity',
        size: 'm',
        data: { model },
      })
      .pipe(
        tap((result) => {
          if (result) {
            this.alerts.open('Alert');
            // this.tableRefresh()
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
