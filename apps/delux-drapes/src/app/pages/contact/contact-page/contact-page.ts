/* eslint-disable @angular-eslint/component-selector */
import { Component, inject, signal } from '@angular/core';
import { markAsSubmit, PhoneFormatPipe } from '@atlas/core';
import { MenuDeferService } from '../../../components/menu-defer/menu-defer-host.service';
import { BreadcrumbsHeader, IBreadcrumbItem } from '../../../modules/breadcrumbs-header/breadcrumbs-header.component';
import { WayWeWorkComponent } from '../../../modules/way-we-work/way-we-work.component';
import { ScrollLink } from '../../../components/scroll-link/scroll-link.directive';
import {
  ADDRESS,
  ADDRESS_LINK,
  EMAIL_CONTACT,
  MAX_CONTACT,
  PERIOD_CONTACT,
  PHONE_CONTACT,
  TELEGRAM_CONTACT,
} from '../../../contacts';
import { MainHeaderComponent } from '../../../modules/main-header/main-header.component';
import { MainFooterComponent } from '../../../modules/main-footer/main-footer.component';
import { FormImports } from '../../../components/form';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormData, injectSendMessage } from '../../../modules/send-service/send.services';
import { finalize } from 'rxjs';

export function ymPartner(): void {
  const { ym } = window as any;
  if (ym) {
    ym(108545164, 'reachGoal', 'partner');
  }
}

@Component({
  selector: 'main',
  templateUrl: 'contact-page.html',
  styleUrls: ['contact-page.scss'],
  imports: [
    ScrollLink,
    BreadcrumbsHeader,
    MainHeaderComponent,
    MainFooterComponent,
    PhoneFormatPipe,
    FormImports,
    WayWeWorkComponent,
  ],
  providers: [MenuDeferService],
  host: { id: 'main' },
})
export class СontactPage {
  protected readonly telegramContact = inject(TELEGRAM_CONTACT);
  protected readonly maxContact = inject(MAX_CONTACT);
  protected readonly phoneContact = inject(PHONE_CONTACT);
  protected readonly periodContact = inject(PERIOD_CONTACT);
  protected readonly address = inject(ADDRESS);
  protected readonly addressLink = inject(ADDRESS_LINK);
  protected readonly emailContact = inject(EMAIL_CONTACT);

  protected readonly breadcrumbs = signal<IBreadcrumbItem[]>([
    {
      title: 'Главная',
      link: ['/'],
    },
    {
      title: 'Контакты',
    },
  ] as const);

  protected readonly form = new FormGroup({
    name: new FormControl(undefined, [Validators.required, Validators.minLength(1)]),
    theme: new FormControl(undefined, [Validators.required]),
    email: new FormControl(undefined, [Validators.required]),
    description: new FormControl(''),
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
