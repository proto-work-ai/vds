import { Directive, ElementRef, inject } from '@angular/core';
import { SITE_CONTACTS } from './site-contacts';

@Directive({
  selector: '[data-contact-link]',
  standalone: true,
})
export class ContactLinksDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly contacts = SITE_CONTACTS;

  constructor() {
    const link = this.element.getAttribute('data-contact-link');
    let value: { href: string; text: string | null } | null = null;

    switch (link) {
      case 'phone':
        value = {
          href: `tel:+${this.contacts.phone.replace(/\D/g, '')}`,
          text: this.contacts.phone,
        };
        break;
      case 'email':
        value = { href: `mailto:${this.contacts.email}`, text: this.contacts.email };
        break;
      case 'telegram':
        value = { href: this.contacts.telegram, text: null };
        break;
      case 'max':
        value = { href: this.contacts.max, text: null };
        break;
      case 'map':
        value = { href: this.contacts.addressLink, text: null };
        break;
    }

    if (!value) return;
    this.element.setAttribute('href', value.href);
    if (value.text) this.element.textContent = value.text;
  }
}
