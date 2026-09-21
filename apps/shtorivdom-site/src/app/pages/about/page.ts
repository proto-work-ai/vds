import { LeadFormComponent } from '../../forms/lead-form.component';
import { RouterLink } from '@angular/router';
import { LeadStatus } from '../../forms/lead-status';
import { LeadFields } from '../../forms/lead-fields';
import { CounterDirective } from '../../components/reveal.directive';
import { RevealDirective } from '../../components/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInput, TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { ContactLinksDirective } from '../../contact-links.directive';
import { LeadFormDirective } from '../../forms/lead-form.directive';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/about/index.html
@Component({
  selector: 'app-about-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LeadFormComponent,
    LeadFields,
    RouterLink,
    LeadStatus,
    CounterDirective,
    RevealDirective,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInput,
    TuiInputPhone,
    TuiTextarea,
    LeadFormDirective,
    ContactLinksDirective,
  ],
})
export class AboutPage {}
