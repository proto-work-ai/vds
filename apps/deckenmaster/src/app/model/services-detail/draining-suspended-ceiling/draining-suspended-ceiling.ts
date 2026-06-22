import { Component, signal } from '@angular/core';
import { TuiAccordion } from '@taiga-ui/kit';
import { IsPlatformBrowserDirective } from '../../../components/is-platform-browser.directive';
import { drainingSuspendedPrice } from '../../service-pages';
import { PriceListUnitTable } from '../../../modules/catalog-price/price-list-unit-table/price-list-unit-table';
import { AnyQuestions } from '../../../components/any-questions/any-questions';
import { ServicesBanner } from "../../../modules/services/services-banner/services-banner";

/*
  https://slivaem-vodu.ru/moskva
*/
@Component({
  templateUrl: 'draining-suspended-ceiling.html',
  imports: [TuiAccordion, IsPlatformBrowserDirective, PriceListUnitTable, AnyQuestions, ServicesBanner],
})
export class Detail {
  protected readonly drainingSuspendedPrice = signal(drainingSuspendedPrice);
}
