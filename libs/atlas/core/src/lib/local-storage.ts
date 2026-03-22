import { signal, effect } from '@angular/core';

export function injectLocalStorageValue(key: string, defaultValue?: unknown) {
  const keyValue = localStorage.getItem(key);
  let prevValue: unknown = keyValue != null ? JSON.parse(keyValue) : defaultValue;
  const value = signal<unknown>(prevValue);
  effect(() => {
    const newValue = value();
    if (prevValue !== newValue) {
      localStorage.setItem(key, JSON.stringify(newValue));
      prevValue = newValue;
    }
  });
  return value;
}
