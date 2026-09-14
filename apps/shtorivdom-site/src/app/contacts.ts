import { InjectionToken } from '@angular/core';

export const ADDRESS = new InjectionToken<string>('ADDRESS', {
  providedIn: 'root',
  factory: () => 'Район Троицк, Кварцевая улица, 3, корп. 2',
});

export const ADDRESS_LINK = new InjectionToken<string>('ADDRESS_LINK', {
  providedIn: 'root',
  factory: () => 'https://yandex.ru/maps/-/CDQG4AYV',
});

export const EMAIL_CONTACT = new InjectionToken<string>('EMAIL_CONTACT', {
  providedIn: 'root',
  factory: () => 'info@shtorivdom.ru',
});

export const TELEGRAM_CONTACT = new InjectionToken<string>('TELEGRAM_CONTACT', {
  providedIn: 'root',
  factory: () => '@andreevav1',
});

export const MAX_CONTACT = new InjectionToken<string>('MAX_CONTACT', {
  providedIn: 'root',
  factory: () => 'https://max.ru/u/f9LHodD0cOIMeP9lespjPt8cxagsm7ObEGSeElhYDRMQhW9vFT_lt7I30J0',
});

export const PHONE_CONTACT = new InjectionToken<string>('PHONE_CONTACT', {
  providedIn: 'root',
  factory: () => '9255946117',
});

export const PERIOD_CONTACT = new InjectionToken<string>('PERIOD_CONTACT', {
  providedIn: 'root',
  factory: () => {
    const year = new Date().getFullYear();
    return `© 2020–${year > 2026 ? year : 2026}`;
  },
});

export const VAR_YANDEX_KEY = 'd3092fef-1457-4d91-a52a-c98f2947e024';

export const YANDEX_KEY = new InjectionToken<string>('YANDEX_KEY', {
  providedIn: 'root',
  factory: () => VAR_YANDEX_KEY,
});

export const COMPANY_NAME = new InjectionToken<string>('COMPANY_NAME', {
  providedIn: 'root',
  factory: () => `ООО «Shtorivdom»`,
});
