/* eslint-disable @angular-eslint/component-selector */
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
  lucideEllipsisVertical,
} from '@ng-icons/lucide';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { AtlasTaigaUiTable } from "../taiga-ui-table/taiga-ui-table";
import { AtlasDataTableComponents } from '../data-table/data-table';
import { AtlasDataTableToggleSize } from '../data-table-tools/data-table-toggle-size';
import { AtlasTablePaginatePipe } from '../atlas-table-paginate';
import { TABlE_COLUMN_CONTEXT, TABLE_ROW } from '../taiga-ui-table/table-cell-context';
import { IMenuItem } from '@atlas/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'atlas-column-table-menu',
  template: `
    <div class="flex justify-end">
      <button hlmBtn size="icon" variant="outline" class="size-7" align="end" [hlmDropdownMenuTrigger]="menu">
        <ng-icon hlm size="sm" name="lucideEllipsisVertical"></ng-icon>
      </button>
    </div>

		<ng-template #menu>
			<hlm-dropdown-menu class="w-min-30">
				<hlm-dropdown-menu-group>
          @for(item of menuItems; track item){
            <a hlmDropdownMenuItem [routerLink]="item.link" (click)="itemClick(item)">
              <ng-icon [name]="item.icon" [classList]="[item.iconClass]" />
              <span>{{item.title}}</span>
            </a>
          }
				</hlm-dropdown-menu-group>
			</hlm-dropdown-menu>
		</ng-template>
    `,
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
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgIcon,
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
      lucideEllipsisVertical,
    }),
  ],
})
export class AtlasColumnTableMenu {
  protected readonly menuItems = inject(TABlE_COLUMN_CONTEXT) as IMenuItem[];
  protected readonly tableRow = inject(TABLE_ROW);

  protected itemClick(item: IMenuItem) {
    item.onClick && item.onClick(this.tableRow);
  }
}
