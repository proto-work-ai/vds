import { LeadFormComponent } from '../../forms/lead-form.component';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../components/reveal.directive';
import { GALLERY } from '../../components/gallery.service';
import { PhotoStripDirective } from '../../components/photo-strip.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactLinksDirective } from '../../contact-links.directive';
import { SITE_PRICES } from '@shtorivdom/site-kit';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/catalog/curtain-rods/4/index.html
@Component({
  selector: 'app-catalog-curtain-rods-4-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LeadFormComponent,
    RouterLink,
    RevealDirective,
    GALLERY,
    PhotoStripDirective,
    ContactLinksDirective,
  ],
})
export class CatalogCurtainRods4Page {
  protected readonly rodPrices = SITE_PRICES.find((section) => section.key === 'curtain-rods')!;
}
