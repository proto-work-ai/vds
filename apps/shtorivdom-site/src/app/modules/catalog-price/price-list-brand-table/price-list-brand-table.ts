import { Component, computed, input } from '@angular/core';
import { AtlasTaigaUiTable } from '@atlas/table';
import { ColumnAttributeTable } from '@atlas/core';
import { CurtainPrice, unitName } from '../../../model/price-list.service';

function range(data: number | number[] | undefined, suffix: string, single = ''): string {
  if (data === undefined) return '—';
  if (Array.isArray(data)) {
    return data.length > 1 ? `от ${data[0]} до ${data[1]} ${suffix}` : `${single}${data[0]} ${suffix}`;
  }
  return `${single}${data} ${suffix}`;
}

// Таблица из @atlas/table отдаёт строку как Record<string, unknown>.
const asPrice = (row: Record<string, unknown>) => row as unknown as CurtainPrice;

// Таблица цен на странице каталога; на узком экране — только название и цена.
@Component({
  selector: 'app-price-list-brand-table',
  templateUrl: './price-list-brand-table.html',
  styleUrl: 'price-list-brand-table.scss',
  imports: [AtlasTaigaUiTable],
})
export class PriceListBrandTable {
  protected readonly columns = computed<ColumnAttributeTable[]>(() => [
    { title: 'Материал / модель', key: 'name', type: 'string' },
    { title: 'Производство', key: 'country', type: 'string' },
    {
      title: 'Ширина, м',
      key: 'width',
      type: 'string',
      formatter: (row) => range(asPrice(row).width, 'м', 'до '),
    },
    {
      title: 'Гарантия',
      key: 'warranty',
      type: 'string',
      formatter: (row) => `${asPrice(row).warranty} лет`,
    },
    {
      title: 'Цена <div class="text-sm">с пошивом и установкой</div>',
      key: 'price',
      type: 'string',
      formatter: (row) => `${range(asPrice(row).price, '₽', 'от ')} / ${unitName[asPrice(row).unit]}`,
    },
  ]);

  protected readonly columnsSM = computed(() => {
    const list = this.columns();
    return [list[0], list[list.length - 1]];
  });

  readonly tableRows = input.required<CurtainPrice[]>();

  protected readonly rows = computed(() => this.tableRows() as unknown as Record<string, unknown>[]);
}
