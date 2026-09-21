import { LeadFormComponent } from '../../forms/lead-form.component';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../components/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../../contact-links.directive';
import { SITE_PRICES, SitePriceSection } from '@shtorivdom/site-kit';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/catalog/index.html
@Component({
  selector: 'app-catalog-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeadFormComponent, RouterLink, RevealDirective, ContactLinksDirective],
})
export class CatalogPage {
  protected readonly priceSections = Object.fromEntries(
    SITE_PRICES.map((section) => [section.key, section]),
  ) as Record<string, SitePriceSection>;
}
