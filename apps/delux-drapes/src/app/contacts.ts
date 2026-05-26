import { InjectionToken } from '@angular/core';

export const TELEGRAM_CONTACT = new InjectionToken<string>('TELEGRAM_CONTACT', {
  providedIn: 'root',
  factory: () => '@andreevav1',
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

// export const VAR_YANDEX_KEY = 'c140a678-0e52-4677-a8f8-8bc7984d6e4d';
export const VAR_YANDEX_KEY = 'd3092fef-1457-4d91-a52a-c98f2947e024';

export const YANDEX_KEY = new InjectionToken<string>('YANDEX_KEY', {
  providedIn: 'root',
  factory: () => VAR_YANDEX_KEY,
});