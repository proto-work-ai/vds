import { InjectionToken } from '@angular/core';

export const TELEGRAM_CONTACT = new InjectionToken<string>('MENU_CHANGE_EVENT', {
  providedIn: 'root',
  factory: () => '@andreevav1',
});

export const MAX_CONTACT = new InjectionToken<string>('MENU_CHANGE_EVENT', {
  providedIn: 'root',
  factory: () => 'https://max.ru/u/f9LHodD0cOJxHhcxuinOmj-KluGtCzvdXQJ4bsHr0TAS9863VCVsRARJCac',
});

export const PHONE_CONTACT = new InjectionToken<string>('MENU_CHANGE_EVENT', {
  providedIn: 'root',
  factory: () => '9859936718',
});
