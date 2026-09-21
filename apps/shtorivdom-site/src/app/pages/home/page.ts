import { LeadFormComponent } from '../../forms/lead-form.component';
import { DesignerLeadFormComponent } from '../../forms/designer-lead-form.component';
import { RouterLink } from '@angular/router';
import { LeadStatus } from '../../forms/lead-status';
import { CounterDirective } from '../../components/reveal.directive';
import { RevealDirective } from '../../components/reveal.directive';
import { DeferDirective } from '../../components/defer.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiCheckbox, TuiInput, TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { ContactLinksDirective } from '../../contact-links.directive';
import { LeadFormDirective } from '../../forms/lead-form.directive';
import { SITE_FAQ, SiteFaq, SiteBeforeAfter, SiteReviewSlider } from '@shtorivdom/site-kit';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/index.html
@Component({
  selector: 'app-home-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LeadFormComponent,
    DesignerLeadFormComponent,
    SiteBeforeAfter,
    SiteReviewSlider,
    RouterLink,
    LeadStatus,
    CounterDirective,
    RevealDirective,
    SiteFaq,
    DeferDirective,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInput,
    TuiInputPhone,
    TuiTextarea,
    TuiCheckbox,
    LeadFormDirective,
    ContactLinksDirective,
  ],
})
export class HomePage {
  protected readonly faq = SITE_FAQ;
}
