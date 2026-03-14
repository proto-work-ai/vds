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
import { AtlasTaigaUiTable, ITablePaginate } from "@atlas/table";
import { AtlasTablePaginatePipe } from '@atlas/table';
import { ColumnAttributeTable } from '@atlas/core';
import { attrMetaEntityDescription, attrMetaEntityDisable, attrMetaEntityReadonly, attrMetaEntityTitle } from '../studio-attribute/studio-entity.attributes';
import { MetaEntityService } from '../services/studio-entity.service';

import { MetaEntity } from '@metadb/client';
import { EntityEditModal } from './entity-edit-modal/entity-edit-modal';
import { ActivatedRoute, Router } from '@angular/router';
import { studioPages } from '../meta.route';
import { attributeColumnMenu } from '../attribute/column-checked.attributes';

@Component({
  selector: 'proto-studio-entity-table',
  templateUrl: './studio-entity-table.component.html',
  styleUrls: ['./studio-entity-table.component.scss'],
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
export class StudioEntitiesComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly alerts = inject(TuiAlertService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialogService = inject(TuiDialogService);
  protected readonly entityService = inject(MetaEntityService);
  protected readonly columns = signal<ColumnAttributeTable[]>([
    attrMetaEntityTitle,
    attrMetaEntityDescription,
    attrMetaEntityDisable,
    attrMetaEntityReadonly,
    this.getColumnMenu(),
  ]);
  private readonly tableRef = viewChild(AtlasTaigaUiTable);

  protected readonly entityServiceAll = signal((paginate: ITablePaginate) =>
    this.entityService.getAll(paginate)
  );

  protected readonly tablePaginate = signal<ITablePaginate>({ currentPage: 1, length: 10, pageCount: 10 });

  protected openEditModal(model?: MetaEntity): void {
    this.dialogService
      .open<string>(new PolymorpheusComponent(EntityEditModal), {
        label: model ? 'Edit Entity' : 'Create Entity',
        size: 'm',
        data: { model },
      })
      .pipe(
        tap((result) => {
          if (result) {
            this.alerts.open('Alert');
            this.tableRefresh()
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected removeById(id: string) {
    this.entityService.delete(id).pipe(
      tap(() => this.tableRefresh()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  private getColumnMenu(): ColumnAttributeTable {
    return attributeColumnMenu([
      {
        title: 'Edit Row',
        icon: 'lucidePencil',
        iconClass: 'text-gray-500',
        onClick: (data: MetaEntity) => {
          this.openEditModal(data);
        }
      },
      {
        title: 'Attributes',
        icon: 'lucideBox',
        iconClass: 'text-gray-500',
        onClick: (data: MetaEntity) => this.router.navigate(['..', studioPages.entities.root, studioPages.entities.attributes, data.id], { relativeTo: this.route })
      },
      {
        title: 'Remove Row',
        icon: 'lucideTrash',
        iconClass: 'text-red-500',
        onClick: (data: MetaEntity) => this.removeById(data.id)
      },
    ])
  }

  private tableRefresh(): void {
    this.tableRef()!.refresh();
  }
}
