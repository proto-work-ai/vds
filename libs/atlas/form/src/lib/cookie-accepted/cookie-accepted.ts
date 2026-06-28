import { Component, ElementRef, inject, ViewEncapsulation, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiTextfield, TuiInput } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiInputPhone, TuiInputSlider } from '@taiga-ui/kit';

@Component({
  templateUrl: 'cookie-accepted.html',
  styleUrl: 'cookie-accepted.scss',
  encapsulation: ViewEncapsulation.None,  
  imports: [
    TuiDataListWrapper,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInputSlider,
    TuiInputPhone,
    TuiInput,
    RouterLink
  ],
})
export class CookieAccepted {
  cookie!: WritableSignal<unknown>;
  private readonly elementRef: ElementRef<HTMLDivElement> = inject(ElementRef<HTMLDivElement>);
  
  protected hideCookieBanner() {
    this.cookie.set('1');
    this.elementRef.nativeElement.setAttribute('hidden', 'true');
    // this.componentRef?.destroy();
  }
}
