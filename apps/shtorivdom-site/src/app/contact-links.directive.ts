import { Directive, ElementRef, inject } from '@angular/core';
import { CONTACT_CONFIG } from './contact-config';

@Directive({
  selector: '[data-contact-link]',
  standalone: true,
})
export class ContactLinksDirective {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly contacts = inject(CONTACT_CONFIG);

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
        value = { href: this.contacts.telegramHref, text: null };
        break;
      case 'max':
        value = { href: this.contacts.maxHref, text: null };
        break;
      case 'map':
        value = { href: this.contacts.mapHref, text: null };
        break;
    }

    if (!value) return;
    this.element.setAttribute('href', value.href);
    if (value.text) this.element.textContent = value.text;
  }
}
