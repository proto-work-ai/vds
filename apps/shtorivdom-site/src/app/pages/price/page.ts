import { LeadFormComponent } from '../../forms/lead-form.component';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../components/reveal.directive';
import { PRICE_TABS } from '../../components/price-tabs.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../../contact-links.directive';
import { SITE_PRICES, SitePriceTabs } from '@shtorivdom/site-kit';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/price/index.html
@Component({
  selector: 'app-price-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LeadFormComponent,
    RouterLink,
    RevealDirective,
    PRICE_TABS,
    ContactLinksDirective,
    SitePriceTabs,
  ],
})
export class PricePage {
  protected readonly prices = SITE_PRICES;
}
