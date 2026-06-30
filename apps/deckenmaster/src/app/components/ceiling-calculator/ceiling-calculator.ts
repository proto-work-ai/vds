import { Component, DestroyRef, inject, input, Pipe, PipeTransform, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNgIconLoader, withCaching } from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { markAsSubmit } from '@atlas/core';
import { distinctUntilChanged, finalize, pairwise, startWith, tap } from 'rxjs';
import { FormImports } from '../../components/form';
import { ZoomController } from '../../modules/price-calculation/zoom-controller/zoom-controller.component';
import { DataListOptionImports } from '../../modules/price-calculation/data-list-options';
import { IFormData, injectSendMessage, ymSubmitEvent } from '../../modules/send-service/send.services';
import { MainAdvantagesComponent } from '../../modules/main-advantages/main-advantages.component';
import { TuiSegmented } from '@taiga-ui/kit';
import { NavMenu } from "../../modules/nav-menu/nav-menu";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-ceiling-calculator',
  templateUrl: './ceiling-calculator.html',
  imports: [ZoomController, DataListOptionImports, FormImports, MainAdvantagesComponent, TuiSegmented, NavMenu],
  providers: [
    provideNgIconLoader((name) => {
      return inject(HttpClient).get(`/price-calculation/${name}.svg`, { responseType: 'text' });
    }, withCaching()),
  ],
  host: {
    id: 'main',
  },
})
export class CeilingCalculator {
  private readonly destroyRef = inject(DestroyRef);
  private readonly sendForm = injectSendMessage(ymSubmitEvent);
  readonly title = input('Расчет цены натяжного потолка с установкой');

  protected readonly typeOptions = signal(['Матовый', 'Тканевый', 'Глянцевый', 'Сатиновый']);

  protected readonly minRange = signal(5);
  protected readonly maxRange = signal(150);
  protected readonly ticksLabels = signal([this.minRange(), 50, 75, 100, this.maxRange()].map((a) => a + 'м²'));

  protected readonly form = new FormGroup({
    // name: new FormControl(undefined, [Validators.required]),
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    type: new FormControl(this.typeOptions()[0]),
    size: new FormControl(this.minRange()),
    description: new FormControl(undefined),

    rooms: new FormControl<string[]>([]),
    lightings: new FormControl<string[]>([]),
    сurtainRods: new FormControl(0),
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
              description: null,
              phone: null,
              сurtainRods: 0,
              // name: null,
            });
            this.form.markAsUntouched();
          })
        )
        .subscribe();
    }
  }
}
