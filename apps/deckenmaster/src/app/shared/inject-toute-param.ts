import { DestroyRef, inject, signal, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { startWith, tap } from 'rxjs';

export function injectRouteParam(name: string): Signal<string | undefined> {
  const destroyRef = inject(DestroyRef);
  const route = inject(ActivatedRoute);
  const param = signal<string | undefined>(undefined);

  route.queryParams
    .pipe(
      startWith(route.snapshot.queryParams),
      tap((params) => {
        param.set(params[name]);
        console.log('param', param());
      }),
      takeUntilDestroyed(destroyRef)
    )
    .subscribe();

  return param.asReadonly();
}
