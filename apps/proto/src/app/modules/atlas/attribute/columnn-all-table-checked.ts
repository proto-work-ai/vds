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
} from '@ng-icons/lucide';
import { Component } from '@angular/core';
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

@Component({
  selector: 'atlas-columnn-all-table-checked',
  template: `
      <label tuiLabel>
        <input tuiCheckbox type="checkbox" size="m" ngModel />
        Readonly
      </label>
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
    }),
  ],
})
export class ColumnAllCheckedTable { }
