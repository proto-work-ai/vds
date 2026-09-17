import { InjectionToken, Provider } from '@angular/core';

export interface ContactConfig {
  phone: string;
  email: string;
  telegramHref: string;
  maxHref: string;
  mapHref: string;
}

export const CONTACT_CONFIG = new InjectionToken<ContactConfig>('CONTACT_CONFIG');

export const provideContactConfig = (config: ContactConfig): Provider => ({
  provide: CONTACT_CONFIG,
  useValue: config,
});

export const DEFAULT_CONTACT_CONFIG: ContactConfig = {
  phone: '+7 (915) 359-12-00',
  email: 'info@shtorivdom.ru',
  telegramHref: 'https://t.me/andreevav1',
  maxHref: 'https://max.ru/u/f9LHodD0cOIMeP9lespjPt8cxagsm7ObEGSeElhYDRMQhW9vFT_lt7I30J0',
  mapHref: 'https://yandex.ru/maps/-/CTxLMJIy',
};
