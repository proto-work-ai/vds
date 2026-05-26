/* eslint-disable @angular-eslint/directive-selector */
import { HttpClient } from '@angular/common/http';
import { Component, Directive, effect, inject, input, InputSignal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { tap } from 'rxjs';
import { SIGNAL } from '@angular/core/primitives/signals';

@Directive({ selector: 'ng-icon[src]' })
export class NgIconSrc {
  protected ngIcon = inject(NgIcon);
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
              this.applyValueToInputSignal(this.ngIcon.svg, svg);
            })
          )
          .subscribe();
      }
    });
  }

  private applyValueToInputSignal<T>(signal: InputSignal<T>, value: T) {
    const node = signal[SIGNAL];
    node.applyValueToInputSignal(node, value);
  }
}

@Component({
  selector: 'app-way-we-work',
  templateUrl: './way-we-work.component.html',
  styleUrls: ['./way-we-work.component.scss'],
  imports: [NgIcon, NgIconSrc],
})
export class WayWeWorkComponent {}
