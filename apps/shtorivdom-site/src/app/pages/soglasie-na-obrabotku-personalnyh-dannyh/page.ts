import { LeadFormComponent } from '../../forms/lead-form.component';
import { RouterLink } from '@angular/router';
import { LeadStatus } from '../../forms/lead-status';
import { LeadFields } from '../../forms/lead-fields';
import { RevealDirective } from '../../components/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInput, TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { ContactLinksDirective } from '../../contact-links.directive';
import { LeadFormDirective } from '../../forms/lead-form.directive';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/soglasie-na-obrabotku-personalnyh-dannyh/index.html
@Component({
  selector: 'app-soglasie-na-obrabotku-personalnyh-dannyh-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LeadFormComponent,
    LeadFields,
    RouterLink,
    LeadStatus,
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
export class SoglasieNaObrabotkuPersonalnyhDannyhPage {}
