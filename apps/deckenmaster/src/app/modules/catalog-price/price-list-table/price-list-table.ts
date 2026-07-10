import { Component, computed, input } from '@angular/core';
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { TuiTree } from '@taiga-ui/kit';
import { PriceListBrandTable } from '../price-list-brand-table/price-list-brand-table';
import { PriceListUnitTable } from '../price-list-unit-table/price-list-unit-table';
import { CeilingMaterialBrand, STUnitPrice } from '../../../model/price-list.service';

@Component({
  selector: 'app-price-list-table',
  templateUrl: './price-list-table.html',
  styleUrl: 'price-list-table.scss',
  imports: [
    TuiDataList,
    TuiDropdown,
    TuiTree,
    HlmIconImports,
    HlmNavigationMenuImports,
    PriceListBrandTable,
    PriceListUnitTable,
  ],
})
export class PriceListTable {
  readonly tableRows = input.required<(CeilingMaterialBrand | STUnitPrice)[]>();
  protected readonly filteredBrand = computed(() => {
    return this.tableRows()
      .map((a) => a as CeilingMaterialBrand)
      .filter((a) => !!a.brand)
      .filter((user, index, self) => index === self.findIndex((u) => u.type === user.type && u.brand === user.brand));
  });

  protected readonly filteredUnit = computed(() => {
    return this.tableRows()
      .filter((a) => !(a as CeilingMaterialBrand).brand)
      .filter((user, index, self) => index === self.findIndex((u) => u.type === user.type));
  });
}
