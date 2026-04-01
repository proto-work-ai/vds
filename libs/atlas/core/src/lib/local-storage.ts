import { signal, effect } from '@angular/core';

export function injectLocalStorageValue<T>(key: string, defaultValue?: T) {
  const keyValue = localStorage.getItem(key);
  let prevValue: T = keyValue != null ? JSON.parse(keyValue) : defaultValue;
  const value = signal<T>(prevValue);
  effect(() => {
    const newValue = value();
    if (prevValue !== newValue) {
      localStorage.setItem(key, JSON.stringify(newValue));
      prevValue = newValue;
    }
  });
  return value;
}
