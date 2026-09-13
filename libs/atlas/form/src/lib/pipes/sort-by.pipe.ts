import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {
  transform<T extends Record<string, unknown>>(items: T[], key: keyof T, direction = 1): T[] {
    return items.sort(sortBy(key, direction));
  }
}

export function sortBy<T extends Record<string, unknown>>(key: keyof T, direction = 1) {
  return (a: T, b: T) => {
    const valA = a[key] ?? 0;
    const valB = b[key] ?? 0;

    if (typeof valA === 'string' && typeof valB === 'string') {
      return valA.localeCompare(valB) * direction;
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return (valA - valB) * direction;
    }

    return 0;
  };
}
