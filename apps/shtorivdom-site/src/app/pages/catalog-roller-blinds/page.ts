import { LeadFormComponent } from '../../forms/lead-form.component';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../components/reveal.directive';
import { GALLERY } from '../../components/gallery.service';
import { PhotoStripDirective } from '../../components/photo-strip.directive';
import { SITE_FAQ, SITE_PRICES, SitePriceTable } from '@shtorivdom/site-kit';
import { SiteFaq } from '@shtorivdom/site-kit';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../../contact-links.directive';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/catalog/roller-blinds/index.html
@Component({
  selector: 'app-catalog-roller-blinds-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LeadFormComponent,
    RouterLink,
    RevealDirective,
    GALLERY,
    PhotoStripDirective,
    SiteFaq,
    SitePriceTable,
    ContactLinksDirective,
  ],
})
export class CatalogRollerBlindsPage {
  protected readonly faq = SITE_FAQ;
  protected readonly priceSection = SITE_PRICES.find((section) => section.key === 'roller-blinds')!;
}
