import { LeadFormComponent } from '../../forms/lead-form.component';
import { RouterLink } from '@angular/router';
import { LeadStatus } from '../../forms/lead-status';
import { LeadFields } from '../../forms/lead-fields';
import { RevealDirective } from '../../components/reveal.directive';
import { GALLERY } from '../../components/gallery.service';
import { PhotoStripDirective } from '../../components/photo-strip.directive';
import { SITE_FAQ } from '@shtorivdom/site-kit';
import { SiteFaq } from '@shtorivdom/site-kit';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInput, TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { ContactLinksDirective } from '../../contact-links.directive';
import { LeadFormDirective } from '../../forms/lead-form.directive';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/catalog/blackout-curtains/index.html
@Component({
  selector: 'app-catalog-blackout-curtains-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LeadFormComponent,
    LeadFields,
    RouterLink,
    LeadStatus,
    RevealDirective,
    GALLERY,
    PhotoStripDirective,
    SiteFaq,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInput,
    TuiInputPhone,
    TuiTextarea,
    LeadFormDirective,
    ContactLinksDirective,
  ],
})
export class CatalogBlackoutCurtainsPage {
  protected readonly faq = SITE_FAQ;
}
