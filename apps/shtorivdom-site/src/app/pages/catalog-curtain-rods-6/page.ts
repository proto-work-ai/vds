import { RouterLink } from '@angular/router';
import { LeadStatus } from '../../forms/lead-status';
import { RevealDirective } from '../../components/reveal.directive';
import { GALLERY } from '../../components/gallery.service';
import { PhotoStripDirective } from '../../components/photo-strip.directive';
import { DeferDirective } from '../../components/defer.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiCheckbox, TuiInput, TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { ContactLinksDirective } from '../../contact-links.directive';
import { LeadFormDirective } from '../../forms/lead-form.directive';

// Сгенерировано tools/mockups/site-to-angular.mjs из mockups/site/catalog/curtain-rods/6/index.html
@Component({
  selector: 'app-catalog-curtain-rods-6-page',
  templateUrl: './page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LeadStatus,
    RevealDirective,
    GALLERY,
    PhotoStripDirective,
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
export class CatalogCurtainRods6Page {}
