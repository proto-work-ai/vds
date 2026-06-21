import { Component, DestroyRef, inject, input, Pipe, PipeTransform, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { markAsSubmit } from '@atlas/core';
import { ZoomController } from './zoom-controller/zoom-controller.component';
import { provideNgIconLoader, withCaching } from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormImports } from '../../components/form';
import { IFormData, injectSendMessage, ymSubmitEvent } from '../send-service/send.services';
import { DataListOptionImports } from './data-list-options';
import { distinctUntilChanged, finalize, pairwise, startWith, tap } from 'rxjs';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-price-calculation',
  templateUrl: './price-calculation.component.html',
  styleUrls: ['./price-calculation.component.scss'],
  imports: [ZoomController, DataListOptionImports, FormImports],
  providers: [
    provideNgIconLoader((name) => {
      return inject(HttpClient).get(`/price-calculation/${name}.svg`, { responseType: 'text' });
    }, withCaching()),
  ],
})
export class PriceCalculationComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly sendForm = injectSendMessage(ymSubmitEvent);
  readonly title = input('Расчет цены натяжного потолка с установкой');

  protected readonly typeOptions = signal(['Матовый', 'Тканевый', 'Глянцевый', 'Сатиновый']);

  protected readonly minRange = signal(5);
  protected readonly maxRange = signal(150);
  protected readonly ticksLabels = signal([this.minRange(), 50, 75, 100, this.maxRange()].map((a) => a + 'м²'));

  protected readonly form = new FormGroup({
    name: new FormControl(undefined, [Validators.required]),
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    type: new FormControl(this.typeOptions()[0]),
    size: new FormControl(this.minRange()),
    description: new FormControl(undefined),

    rooms: new FormControl<string[]>([]),
    lightings: new FormControl<string[]>([]),
  });

  protected readonly rooms = signal([
    { id: 1, title: 'Вся квартира', icon: 'room-1' },
    { id: 2, title: 'Гостинная', icon: 'room-2' },
    { id: 3, title: 'Спальная', icon: 'room-3' },
    { id: 4, title: 'Детская', icon: 'room-4' },
    { id: 5, title: 'Ванная', icon: 'room-5' },
    { id: 6, title: 'Туалет', icon: 'room-6' },
    { id: 7, title: 'Коридор', icon: 'room-7' },
    { id: 8, title: 'Другое', icon: 'room-8' },
  ] as const);

  protected readonly lightins = signal([
    { id: 1, title: 'Светильник', icon: 'lighting-1' },
    { id: 2, title: 'Люстра', icon: 'lighting-2' },
    { id: 3, title: 'Световые линии', icon: 'lighting-3' },
    { id: 4, title: 'LED подсветка ', icon: 'lighting-4' },
  ] as const);

  constructor() {
    const roomsControl = this.form.controls.rooms;
    this.form.controls.rooms.valueChanges
      .pipe(
        startWith([] as any),
        distinctUntilChanged(),
        pairwise(),
        tap(([prev, value]) => {
          const options: any = this.rooms() ?? [];
          if (value?.includes(options?.[0]) && !prev?.includes(options?.[0])) {
            roomsControl.setValue(options.slice(0, options.length - 1), { emitEvent: false });
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      this.sendForm(this.form.value as IFormData)
        .pipe(
          finalize(() => {
            this.form.setValue({
              size: this.minRange(),
              type: this.typeOptions()[0],
              rooms: [],
              lightings: [],
              name: null,
              description: null,
              phone: null,
            });
            this.form.markAsUntouched();
          })
        )
        .subscribe();
    }
  }
}
