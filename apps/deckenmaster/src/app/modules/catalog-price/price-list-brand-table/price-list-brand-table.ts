import { Component, computed, inject, Injector, input, Pipe, PipeTransform, signal } from '@angular/core';
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
import { AtlasDataTableComponents, TABLE_CELL_DATA } from '@atlas/table';
import { AtlasDataTableToggleSize } from '@atlas/table';
import { AtlasTaigaUiTable } from '@atlas/table';
import { AtlasTablePaginatePipe } from '@atlas/table';
import { ColumnAttributeTable } from '@atlas/core';
import { TuiTree } from '@taiga-ui/kit';
import { stretchCeilingBrandMap, STBrandType } from '../../../model/price-list.service';
import { StretchCeilingsType } from '../../../model/stretch-ceilings.data';
import { stretchCeilingName } from '../../../model/stretch-ceilings.service';

@Component({
  selector: 'app-column-brand-cell',
  imports: [],
  template: ` <img [attr.src]="image" class="w-20" /> `,
})
export class ColumnBrandCell {
  protected readonly brandType = inject<STBrandType>(TABLE_CELL_DATA);
  protected get image(): string {
    return stretchCeilingBrandMap.get(this.brandType)?.image!;
  }
}

@Component({
  selector: 'app-price-list-brand-table',
  templateUrl: './price-list-brand-table.html',
  styleUrl: 'price-list-brand-table.scss',
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
export class PriceListBrandTable {
  /*
    {
      "brand": 1,
      "size": 30,
      "width": 5,
      "thickness": [
        0.16,
        0.18
      ],
      "warranty": 7,
      "operatingTemperature": "от +3 до +60 °С"
      "price": 7,
    }
  */
  protected readonly columns = input<ColumnAttributeTable[]>([
    { title: 'Полотно', key: 'brand', type: 'component', cellContent: ColumnBrandCell },
    {
      title: 'Материал',
      key: 'type',
      type: 'string',
      formatter: (row: any) => {
        const type = row.type as StretchCeilingsType;
        if (!stretchCeilingName[type]) {
          debugger;
        }
        return stretchCeilingName[type]!;
      },
    },
    // {
    //   title: 'Площадь м²',
    //   key: 'size',
    //   type: 'string',
    //   formatter: (row: any) => {
    //     const data = row.size;
    //     if (Array.isArray(data)) {
    //       if (data.length > 1) {
    //         return `от ${data[0]} до ${data[1]} м²`;
    //       } else if (data.length === 1) {
    //         return `от ${data} м²`;
    //       }
    //     }
    //     return `от ${data} м²`;
    //   },
    // },
    {
      title: 'Ширина полотна, м',
      key: 'width',
      type: 'string',
      formatter: (row: any) => {
        const data = row.width;
        if (Array.isArray(data)) {
          if (data.length > 1) {
            return `от ${data[0]} до ${data[1]} м`;
          } else if (data.length === 1) {
            return `до ${data} м`;
          }
        }
        return `${data} м`;
      },
    },
    // {
    //   title: 'Толщина, мм',
    //   key: 'thickness',
    //   type: 'string',
    //   formatter: (row: any) => {
    //     const data = row.thickness;
    //     if (Array.isArray(data)) {
    //       if (data.length > 1) {
    //         return `от ${data[0]} до ${data[1]}`;
    //       } else if (data.length === 1) {
    //         return `от ${data}`;
    //       }
    //     } else {
    //       return data;
    //     }
    //   },
    // },
    { title: 'Температура эксплуатации, °С', key: 'operatingTemperature', type: 'string' },
    { title: 'Гарантия', key: 'warranty', type: 'string', formatter: ({ warranty }: any) => `${warranty} лет` },
    {
      title: 'Цена за м² <div class="text-sm">с установкой</div>',
      key: 'price',
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

  protected readonly columnsSM = computed(() => {
    const list = this.columns();
    return [list[0], list[1], list[list.length-1]];
  });

  readonly tableRows = input.required<any[]>();
}
