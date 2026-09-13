import { Component } from '@angular/core';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { type CellContext, type HeaderContext, injectFlexRenderContext } from '@tanstack/angular-table';

@Component({
  template: `
    <hlm-checkbox
      [checked]="_context.table.getIsAllRowsSelected()"
      [indeterminate]="_context.table.getIsSomeRowsSelected()"
      (checkedChange)="_context.table.toggleAllRowsSelected()"
    />
  `,
  imports: [HlmCheckboxImports],
  host: {
    class: 'flex',
    'aria-label': 'Select all',
  },
})
export class TableHeadSelection<T> {
  protected readonly _context = injectFlexRenderContext<HeaderContext<T, unknown>>();
}

@Component({
  template: `
    <hlm-checkbox
      [checked]="_context.row.getIsSelected()"
      (checkedChange)="_context.row.getToggleSelectedHandler()($event)"
    />
  `,
  imports: [HlmCheckboxImports],
  host: {
    class: 'flex',
    'aria-label': 'Select Row',
  },
})
export class TableRowSelection<T> {
  protected readonly _context = injectFlexRenderContext<CellContext<T, unknown>>();
}
