import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'stringifySetter' })
export class StringifySetterPipe implements PipeTransform {
  private readonly storeMap = new Map<unknown, string>();
  transform<T>(items: T[], title: keyof T, key: keyof T = 'id' as keyof T): any {
    return (id: any) => {
      if (id == null) {
        return null;
      } else if (this.storeMap.has(id)) {
        return this.storeMap.get(id);
      }

      if (Array.isArray(id)) {
        return null;
      } else if (typeof id === 'object' && (id as T)[title]) {
        return String((id as T)[title]);
      }

      if (key == null) {
        return String(items?.find((item) => item === id)?.[title] ?? '');
      }

      const item = items?.find((item) => item?.[key] === id);
      if (item) {
        const text = String(item[title] ?? '');
         return this.storeMap.set(id, text).get(id);
      }
      return '';
    };
  }
}


@Pipe({ name: 'keyListValue' })
export class KeyListValuePipe implements PipeTransform {
  transform<T>(
    items: T[],
    key: string,
    value: unknown,
  ): T {
    return items.find((a: any) => a[key] === value) as T;
  }
}
