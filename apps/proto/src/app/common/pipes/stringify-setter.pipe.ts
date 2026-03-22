import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'stringifySetter' })
export class StringifySetterPipe implements PipeTransform {
  transform<T extends object>(items: T[], title: keyof T, key?: string): any {
    return (id: string | object) => {
      if (id == null) {
        return undefined;
      }

      if (Array.isArray(id)) {
        return undefined;
      } else if (typeof id === 'object' && (id as T)[title]) {
        return (id as T)[title];
      }

      if (key == null) {
        return items?.find((item) => item === id)?.[title] ?? '';
      }

      return items?.find((item: any) => item?.[key] === id)?.[title] ?? '';
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
