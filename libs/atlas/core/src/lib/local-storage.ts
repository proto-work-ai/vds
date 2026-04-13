/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isPlatformBrowser } from '@angular/common';
import { signal, effect, Injector, runInInjectionContext, inject, PLATFORM_ID } from '@angular/core';

export function injectLocalStorageValue<T>(key: string, defaultValue?: T, injector?: Injector) {
  const value = signal<T | undefined>(undefined);
  runInInjectionContext(injector ?? inject(Injector), () => {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      const keyValue = localStorage.getItem(key);
      let prevValue: T = keyValue != null ? JSON.parse(keyValue) : defaultValue;
      value.set(prevValue);
      effect(() => {
        const newValue = value();
        if (prevValue !== newValue) {
          localStorage.setItem(key, JSON.stringify(newValue));
          prevValue = newValue!;
        }
      });
    }
  });

  return value;
}
