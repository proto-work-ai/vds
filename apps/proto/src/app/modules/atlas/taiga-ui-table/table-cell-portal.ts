/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/component-selector */
import { PipeTransform, inject, Pipe, ViewContainerRef, TemplateRef, ElementRef, Injector } from '@angular/core';
import { ComponentPortal, ComponentType, DomPortal, TemplatePortal } from '@angular/cdk/portal';
import { MetaAttribute } from '../core/attribute';
import { tableColumnContextProvider, tableRowDataProvider, tableRowProvider } from './table-cell-context';
import { ColumnTableChecked } from '../attribute/column-table-checked';

@Pipe({ name: 'tableCellPortal' })
export class TableCellPortalPipe<T = unknown> implements PipeTransform {
    private readonly injector = inject(Injector);
    private readonly viewContainerRef = inject(ViewContainerRef);

    transform(row: Record<string, unknown>, column: MetaAttribute) {
        switch (column.type) {
            case 'template':
                return new TemplatePortal(column.cellContent as TemplateRef<unknown>, this.viewContainerRef, row, this.createIngector(row, column));
            case 'component':
                return new ComponentPortal(column.cellContent as ComponentType<unknown>, this.viewContainerRef, this.createIngector(row, column));
            case 'boolean':
                return new ComponentPortal((column.cellContent as ComponentType<unknown>) ?? ColumnTableChecked, this.viewContainerRef, this.createIngector(row, column));
            case 'element':
                return new DomPortal(column.cellContent as ElementRef<HTMLElement>);
            default:
                return '';
        }
    }

    private createIngector(row: Record<string, unknown>, column: MetaAttribute): Injector {
        return Injector.create({
            parent: this.injector, providers: [
                tableRowProvider(row),
                tableColumnContextProvider(column.cellContentContext),
                tableRowDataProvider(row?.[column.key]),
            ]
        })
    }
}