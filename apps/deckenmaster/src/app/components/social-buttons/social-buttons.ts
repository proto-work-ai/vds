import { Component, inject } from '@angular/core';
import { MAX_CONTACT, PHONE_CONTACT, TELEGRAM_CONTACT } from '../../contacts';
import { FormImports } from '../form';
import { HrefContact } from '../phone-contact.componnent';

@Component({
  selector: 'app-social-buttons',
  templateUrl: 'social-buttons.html',
  imports: [FormImports, HrefContact],
})
export class SocialButtons {
  protected readonly telegramContact = inject(TELEGRAM_CONTACT);
  protected readonly maxContact = inject(MAX_CONTACT);
  protected readonly phoneContact = inject(PHONE_CONTACT);
}
