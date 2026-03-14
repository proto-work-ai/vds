/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
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
import { TuiCheckbox } from '@taiga-ui/kit';
import { TuiLabel } from '@taiga-ui/core';
import { TABLE_CELL_DATA } from '@atlas/table';

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
