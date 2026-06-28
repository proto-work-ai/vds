import { Component, ElementRef, inject, ViewEncapsulation, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield, TuiInput } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiInputPhone, TuiInputSlider } from '@taiga-ui/kit';
import { FormImports } from '../../components/form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookie-accepted',
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
    FormImports,
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
