/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @angular-eslint/component-selector */
import { PipeTransform, inject, Pipe, ViewContainerRef, TemplateRef, ElementRef, Injector } from '@angular/core';
import { ComponentPortal, ComponentType, DomPortal, TemplatePortal } from '@angular/cdk/portal';
import { ColumnAttributeTable } from '@atlas/core';
import { tableColumnContextProvider, tableRowDataProvider, tableRowProvider } from './table-cell-context';
import { ColumnTableChecked } from '@atlas/table';


@Pipe({ name: 'tableCellPortal' })
export class TableCellPortalPipe<T = unknown> implements PipeTransform {
    private readonly injector = inject(Injector);
    private readonly viewContainerRef = inject(ViewContainerRef);

    transform(row: Record<string, unknown>, column: ColumnAttributeTable) {
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

    private createIngector(row: Record<string, unknown>, column: ColumnAttributeTable): Injector {
        return Injector.create({
            parent: this.injector, providers: [
                tableRowProvider(row),
                tableColumnContextProvider(column.cellContentContext),
                tableRowDataProvider(row?.[column.key]),
            ]
        })
    }
}