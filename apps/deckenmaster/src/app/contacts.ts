import { InjectionToken } from '@angular/core';

export const TELEGRAM_CONTACT = new InjectionToken<string>('TELEGRAM_CONTACT', {
  providedIn: 'root',
  factory: () => 'RuslanPotolok', // 'andreevav1',
});

export const MAX_CONTACT = new InjectionToken<string>('MAX_CONTACT', {
  providedIn: 'root',
  // factory: () => 'https://max.ru/u/f9LHodD0cOJxHhcxuinOmj-KluGtCzvdXQJ4bsHr0TAS9863VCVsRARJCac',
  factory: () => 'https://max.ru/u/f9LHodD0cOIMeP9lespjPt8cxagsm7ObEGSeElhYDRMQhW9vFT_lt7I30J0',
});

export const PHONE_CONTACT = new InjectionToken<string>('PHONE_CONTACT', {
  providedIn: 'root',
  // factory: () => '9859936718',
  factory: () => '9040148649',
});

export const PERIOD_CONTACT = new InjectionToken<string>('PERIOD_CONTACT', {
  providedIn: 'root',
  factory: () => {
    const year = new Date().getFullYear();
    return `© 2020-${year > 2026 ? year : 2026}`;
  },
});
