/* eslint-disable @angular-eslint/component-selector */
import { Component, inject, signal } from '@angular/core';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { ScrollLink } from '../../../components/scroll-link/scroll-link.directive';
import { MAX_CONTACT, PERIOD_CONTACT, PHONE_CONTACT, TELEGRAM_CONTACT } from '../../../contacts';
import { MainHeaderComponent } from '../../../modules/main-header/main-header.component';
import { MainFooterComponent } from '../../../modules/main-footer/main-footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiDataListWrapper, TuiInputPhone, TuiInputSlider, TuiTextarea } from '@taiga-ui/kit';
import { FormGroupStore } from '../../../components/form-store/form-store.directive';
import { TuiCheckbox, TuiInput } from '@taiga-ui/core';
import { markAsSubmit } from '@atlas/core';
import { IFormData, injectSendMessage } from '../../../modules/send-service/send.services';
import { finalize } from 'rxjs';
import { provideIcons } from '@ng-icons/core';
import { NgIconImports } from '../../../components/ng-icon-src.directive';
import { lucideCheckCircle } from '@ng-icons/lucide';
import { FormImports } from '../../../components/form';

export function ymPartner(): void {
  const { ym } = window as any;
  if (ym) {
    ym(108545164, 'reachGoal', 'partner');
  }
}

@Component({
  selector: 'main',
  templateUrl: 'partner-page.html',
  styleUrls: ['partner-page.scss'],
  imports: [
    ScrollLink,
    BreadcrumbsHeader,
    TuiDataListWrapper,
    ReactiveFormsModule,
    TuiInputSlider,
    TuiInputPhone,
    FormGroupStore,
    TuiInput,
    TuiTextarea,
    TuiCheckbox,
    MainHeaderComponent,
    MainFooterComponent,
    NgIconImports,
    FormImports
  ],
  providers: [
    provideIcons({
      lucideCheckCircle,
    }),
  ],
  host: { id: 'main' },
})
export class PartnerPage {
  protected readonly telegramContact = inject(TELEGRAM_CONTACT);
  protected readonly maxContact = inject(MAX_CONTACT);
  protected readonly phoneContact = inject(PHONE_CONTACT);
  protected readonly periodContact = inject(PERIOD_CONTACT);

  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([
    {
      title: 'Главная',
      link: ['/'],
    },
    {
      title: 'Cтать партнером',
    },
  ] as const);

  protected readonly form = new FormGroup({
    name: new FormControl(undefined, [Validators.required, Validators.minLength(1)]),
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    description: new FormControl(''),
    city: new FormControl(undefined),
    checked: new FormControl(false, [Validators.requiredTrue]),
  });

  private readonly sendForm = injectSendMessage(ymPartner);

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      this.sendForm(this.form.value as IFormData)
        .pipe(
          finalize(() => {
            this.form.setValue({} as any);
            this.form.markAsUntouched();
          })
        )
        .subscribe();
    }
  }
}
