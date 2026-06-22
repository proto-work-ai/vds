/* eslint-disable @angular-eslint/component-selector */
import { Component, inject, input, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { AtlasFormImports } from '@atlas/form';
import { AtlasDataTableComponents, TABLE_CELL_DATA } from '@atlas/table';
import { AtlasTaigaUiTable } from '@atlas/table';
import { TuiTree } from '@taiga-ui/kit';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { MainHeaderComponent } from '../../../modules/main-header/main-header.component';
import { FooterMenuComponent } from '../../../modules/footer-menu/footer-menu.component';
import { NavMenu } from '../../../modules/nav-menu/nav-menu';
import { ColumnAttributeTable } from '@atlas/core';
import { PriceUnit } from '../../../model/price-list.service';
import { RouterLink, Route, ActivatedRoute } from '@angular/router';
import { OrderFormComponent } from "../../../modules/order/order-form/order-form.component";

@Component({
  template: `<a [routerLink]="['/order/edit']" class="text-blue-600 underline decoration-solid cursor-pointer">{{
    key
  }}</a>`,
  imports: [RouterLink],
})
export class RouterLinkCell {
  protected readonly key = inject(TABLE_CELL_DATA);
}

@Component({
  selector: 'main',
  templateUrl: 'order-edit-page.html',
  host: {
    id: 'main',
  },
  imports: [
    TuiDataList,
    TuiDropdown,
    TuiTree,
    AtlasFormImports,
    AtlasDataTableComponents,
    MainHeaderComponent,
    FooterMenuComponent,
    BreadcrumbsHeader,
    NavMenu,
    AtlasTaigaUiTable,
    OrderFormComponent
],
  providers: [
    provideIcons({
      lucideChevronDown,
    }),
  ],
})
export class OrderEditPage {
  protected readonly key = inject(ActivatedRoute).snapshot.params['key'];

  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([
    {
      title: 'Главная',
      link: ['/'],
    },
    {
      title: 'Список заказов',
      link: ['/orders'],
    },
    {
      title: `Редактирование заказа`,
    },
  ] as const);

  protected readonly columns = input<ColumnAttributeTable[]>([
    {
      title: 'Номер заказа',
      key: 'key',
      type: 'component',
      cellContent: RouterLinkCell,
      // formatter: (row: any) => {
      //   return `<a class="text-blue-600 underline decoration-solid cursor-pointer">#34346</a>`;
      // },
    },

    {
      title: 'Имя клиента/телефон',
      key: 'userName',
      type: 'string',
      formatter: (row: any) => {
        return `
          <div class="text-sm">
            <div>Ruslan Khatuev</div>
            <a href="tel:+79040148649" class="text-blue-600">+7 904 014 86 49</a>
          </div>
        `;
      },
    },
    // {
    //   title: 'Ед.изм.',
    //   key: 'unit',
    //   type: 'string',
    //   formatter: (row: any) => unitFormatter(row.unit),
    // },
    {
      title: 'Цена',
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

    {
      //
      title: 'Дата заказа',
      key: 'date',
      type: 'date',
      formatter: (row: any) => {
        return `<span class="text-sm">15 июня 2026 г 18:24</span>`;
      },
    },
  ]);

  readonly tableRows = signal<any[]>(
    ' '
      .repeat(30)
      .split('')
      .map(() => {
        return {
          key: '#34346',
          name: 'Слив воды с натяжного потолка',
          unit: PriceUnit.M2,
          price: 2490,
        };
      })
  );
}
