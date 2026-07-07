import { PipeTransform, Pipe, inject, OnDestroy, signal } from '@angular/core';
import { TuiIdentityMatcher, TuiStringHandler, TuiStringMatcher } from '@taiga-ui/cdk';

@Pipe({ name: 'stringifySetter' })
export class StringifySetterPipe implements PipeTransform, OnDestroy {
  private readonly items = signal([]);
  private itemsStore = new Set();

  ngOnDestroy(): void {
    this.itemsStore.clear();
  }

  transform<T>(items: readonly T[], titleKey: keyof T, idKey: keyof T = 'id' as keyof T): TuiStringHandler<unknown> {
    this.itemsStore = new Set([...(Array.isArray(items) ? items : []), ...(this.items() as [])]);
    return (id: any) => {
      const items: any[] = Array.from(this.itemsStore).concat(this.items());
      this.itemsStore = new Set(items);
      if (id == null || Array.isArray(id)) {
        return '';
      }

      if (typeof id === 'object' && (id as T)[titleKey]) {
        return String((id as T)[titleKey] ?? '');
      }

      if (idKey == null) {
        return String(items?.find((item) => item === id)?.[titleKey] ?? '');
      }

      const item = items?.find((item) => item?.[idKey] === id);
      if (item) {
        return String(item[titleKey] ?? '');
      }
      return '';
    };
  }
}

@Pipe({ name: 'stringifyMatcher' })
export class StringifyMatcherPipe implements PipeTransform {
  transform<T extends object>(items: T[], field: keyof T): TuiStringMatcher<T> {
    return (item: T, text: string) => {
      if (typeof item[field] === 'string') {
        return item[field]?.toLowerCase().includes(text?.toLowerCase());
      }
      return false;
    };
  }
}

/*
 tuiItemsHandlersProvider({
   identityMatcher: signal((a: { key: string }, b: { key: string }) => {
    return a.key === b.key;
   }),
 }),
*/
@Pipe({ name: 'identityMatcher' })
export class IdentityMatcherPipe implements PipeTransform {
  transform<T extends object>(items: unknown, key: keyof T): TuiIdentityMatcher<T> {
    return (item: T, item2: T) => {
      if (typeof item[key] === 'string' && typeof item2[key] === 'string') {
        return item[key]?.toLowerCase().includes(item2[key]?.toLowerCase());
      }
      return false;
    };
  }
}

@Pipe({ name: 'identityMatcherString' })
export class IdentityMatcherStringPipe implements PipeTransform {
  transform(items: unknown) {
    return (item: string, item2: string) => {
      if (typeof item === 'string' && typeof item2 === 'string') {
        return item.toLowerCase().includes(item2.toLowerCase());
      }
      return false;
    };
  }
}

// @Pipe({ name: 'identityMatcherHandler' })
// export class IdentityMatcherHandlerPipe implements PipeTransform {
//   private identityMatcher = inject(TUI_ITEMS_HANDLERS).identityMatcher();
//   transform(items: unknown): SelectedHandler<unknown> {
//     return (list, b) => {
//       return !!list?.find((a) => this.identityMatcher(a, b));
//     };
//   }
// }

export const StringTextfieldImports = [
  StringifySetterPipe,
  StringifyMatcherPipe,
  IdentityMatcherPipe,
  IdentityMatcherStringPipe,
  // IdentityMatcherHandlerPipe,
];
