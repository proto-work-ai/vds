import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { markAsSubmit } from '@atlas/core';
import { TuiTextfield } from '@taiga-ui/core';
import {
  TuiChevron,
  TuiDataListWrapper,
  TuiInputPhone,
  tuiInputPhoneOptionsProvider,
  TuiInputRange,
  TuiInputSlider,
  TuiSelect,
  TuiTextarea,
  TuiTextareaLimit,
} from '@taiga-ui/kit';
import { ZoomControllerComponent } from './zoom-controller/zoom-controller.component';
import { NgIcon, provideNgIconLoader, withCaching } from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';
import { DataListOptionImports } from './data-list-options';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, pairwise, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-price-calculation',
  templateUrl: './price-calculation.component.html',
  styleUrls: ['./price-calculation.component.scss'],
  imports: [
    TuiDataListWrapper,
    TuiSelect,
    FormsModule,
    ReactiveFormsModule,
    TuiInputRange,
    TuiInputSlider,
    TuiInputPhone,
    TuiTextarea,
    TuiTextfield,
    ZoomControllerComponent,
    DataListOptionImports,
    TuiTextareaLimit,
  ],
  providers: [
    tuiInputPhoneOptionsProvider({
      valueTransformer: {
        fromControlValue: (value) => `+${value}`,
        toControlValue: (value) => value?.slice(1),
      },
    }),

    provideNgIconLoader((name) => {
      return inject(HttpClient).get(`/price-calculation/${name}.svg`, { responseType: 'text' });
    }, withCaching()),
  ],
})
export class PriceCalculationComponent {
  private readonly destroyRef = inject(DestroyRef);
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
    comment: new FormControl(undefined),

    rooms: new FormControl<string[]>([]),
    lightings: new FormControl<string[]>([]),
  });

  protected readonly rooms = signal([
    { title: 'Вся квартира', icon: 'room-1' },
    { title: 'Гостинная', icon: 'room-2' },
    { title: 'Спальная', icon: 'room-3' },
    { title: 'Детская', icon: 'room-4' },
    { title: 'Ванная', icon: 'room-5' },
    { title: 'Туалет', icon: 'room-6' },
    { title: 'Коридор', icon: 'room-7' },
    { title: 'Другое', icon: 'room-8' },
  ] as const);

  protected readonly lightins = signal([
    { title: 'Светильник', icon: 'lighting-1' },
    { title: 'Люстра', icon: 'lighting-2' },
    { title: 'Световые линии', icon: 'lighting-3' },
    { title: 'LED подсветка ', icon: 'lighting-4' },
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

  protected formSubmit() {
    if (markAsSubmit(this.form)) {
      console.log('formSubmit', this.form.value);
    }
  }
}
