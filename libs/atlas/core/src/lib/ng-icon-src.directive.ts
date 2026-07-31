/* eslint-disable @angular-eslint/directive-selector */
import { HttpClient } from '@angular/common/http';
import { DestroyRef, Directive, effect, inject, input, InputSignal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { tap } from 'rxjs';
import { SIGNAL } from '@angular/core/primitives/signals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

function applyValueToInputSignal<T>(signal: InputSignal<T>, value: T) {
  const node = signal[SIGNAL];
  node.applyValueToInputSignal(node, value);
}

@Directive({ selector: 'ng-icon[src]' })
export class NgIconSrc {
  protected ngIcon = inject(NgIcon);
  protected destroyRef = inject(DestroyRef);
  protected http = inject(HttpClient);
  readonly src = input<string>();

  constructor() {
    effect(() => {
      const srcUrl = this.src();
      if (srcUrl) {
        this.http
          .get(srcUrl, { responseType: 'text' })
          .pipe(
            tap((svg) => {
              applyValueToInputSignal(this.ngIcon.svg, svg);
            }),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe();
      }
    });
  }
}

export const NgIconImports = [NgIcon, NgIconSrc] as const;
