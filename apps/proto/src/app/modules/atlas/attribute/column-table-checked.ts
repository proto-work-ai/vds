/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { provideIcons } from '@ng-icons/core';
import {
  lucideLayersPlus,
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
  lucideChevronDown,
} from '@ng-icons/lucide';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { TABLE_CELL_DATA } from '../taiga-ui-table/table-cell-context';
import { TuiCheckbox } from '@taiga-ui/kit';
import { TuiLabel } from '@taiga-ui/core';

@Component({
  selector: 'atlas-column-table-checked',
  template: `
      <label tuiLabel class="pointer-events-none">
        <input tuiCheckbox type="checkbox" size="s" [ngModel]="cellData" readonly/>
      </label>
    `,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiCheckbox,
    TuiLabel,
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
export class ColumnTableChecked {
  protected readonly cellData = inject(TABLE_CELL_DATA);
 }
