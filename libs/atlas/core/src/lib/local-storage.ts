/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isPlatformBrowser } from '@angular/common';
import { signal, effect, Injector, runInInjectionContext, inject, PLATFORM_ID } from '@angular/core';

export function injectLocalStorage<T>(
  key: string,
  { defaultValue, injector }: { defaultValue?: T; injector?: Injector } = {}
) {
  const store = signal<T | undefined>(undefined);
  runInInjectionContext(injector ?? inject(Injector), () => {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      const keyValue = localStorage.getItem(key);
      let prevValue: T = keyValue != null ? JSON.parse(keyValue) : defaultValue;
      store.set(prevValue);
      effect(() => {
        const newValue = store();
        if (prevValue !== newValue) {
          localStorage.setItem(key, JSON.stringify(newValue));
          prevValue = newValue!;
        }
      });
    }
  });
  return store;
}
