import { Component, inject, Injector, input, Pipe, PipeTransform, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronDown,
  lucideLink,
  lucideCircle,
  lucideCheck,
  lucideInfo,
  lucidePhone,
  lucideMenu,
  lucideX,
  lucideChevronRight,
} from '@ng-icons/lucide';
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { AtlasFormImports } from '@atlas/form';
import { AtlasDataTableComponents } from '@atlas/table';
import { AtlasDataTableToggleSize } from '@atlas/table';
import { AtlasTaigaUiTable } from '@atlas/table';
import { AtlasTablePaginatePipe } from '@atlas/table';
import { ColumnAttributeTable } from '@atlas/core';
import { TuiTree } from '@taiga-ui/kit';
import { Unit } from '../../../model/price-list.service';

@Component({
  selector: 'app-price-list-unit-table',
  templateUrl: './price-list-unit-table.html',
  styleUrl: 'price-list-unit-table.scss',
  imports: [
    TuiDataList,
    TuiDropdown,
    TuiTree,
    AtlasFormImports,
    AtlasDataTableComponents,
    AtlasTaigaUiTable,
    NgIcon,
    AtlasDataTableToggleSize,
    AtlasTablePaginatePipe,
  ],
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideLink,
      lucideCircle,
      lucideCheck,
      lucideInfo,
      lucidePhone,
      lucideMenu,
      lucideX,
      lucideChevronRight,
    }),
  ],
})
export class PriceListUnitTable {
  /*
    { 
      name: 'Контурные', 
      unit: Unit.LinearMeter, 
      price: 900 
     }
  */
  protected readonly columns = input<ColumnAttributeTable[]>([
    { title: 'Название', key: 'name', type: 'string' },
    {
      title: 'Ед.изм.',
      key: 'unit',
      type: 'string',
      formatter: (row: any) => {
        switch (row.unit) {
          case Unit.M2:
            return 'м²';
          case Unit.Things:
            return 'шт.';
          case Unit.Point:
            return 'точка';
          case Unit.LinearMeter:
            return 'м.пог.';
          default:
            return '';
        }
      },
    },
    {
      title: 'Цена с установкой',
      key: 'width',
      type: 'string',
      formatter: (row: any) => {
        const data = row.price;
        if (Array.isArray(data)) {
          if (data.length > 1) {
            return `от ${data[0]} до ${data[1]} руб`;
          } else if (data.length === 1) {
            return `от ${data} руб`;
          }
        }
        return `${data} руб`;
      },
    },
  ]);

  readonly tableRows = input.required<any[]>();
}
