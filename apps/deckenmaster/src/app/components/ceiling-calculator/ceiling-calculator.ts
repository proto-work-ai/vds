import { Component, DestroyRef, effect, inject, input, Pipe, PipeTransform, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideIcons, provideNgIconLoader, withCaching } from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { markAsSubmit } from '@atlas/core';
import { distinctUntilChanged, finalize, pairwise, startWith, tap } from 'rxjs';
import { FormImports } from '../../components/form';
import { DataListOptionImports } from '../../modules/price-calculation/data-list-options';
import { IFormData, injectSendMessage, ymSubmitEvent } from '../../modules/send-service/send.services';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiTextfieldComponent } from '@taiga-ui/core';
import { lucideCalculator } from '@ng-icons/lucide';

const typeOptions = signal([
  { id: 1, title: 'Матовый', price: 600 },
  { id: 2, title: 'Глянцевый', price: 600 },
  { id: 3, title: 'Сатиновый', price: 600 },
  { id: 4, title: 'Тканевый', price: 1400 },
] as const);

const wallProfile = signal([
  { id: 1, title: 'Пластиковый', icon: 'room-1', price: 100 },
  { id: 2, title: 'Алюминиевый', icon: 'room-2', price: 200 },
  { id: 3, title: 'Теневой (пластиковый)', icon: 'room-3', price: 300 },
  { id: 4, title: 'Теневой (Алюминиевый KRAAB)', icon: 'room-4', price: 1200 },
] as const);

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({ name: 'price', pure: false })
export class PricePipe implements PipeTransform {
  private readonly textfield = inject(TuiTextfieldComponent);

  transform(_id: number, list: readonly { id: number; price: number }[]) {
    const id = this.textfield.control()?.value;
    const price = list.find((a) => a.id === id)?.price;
    return price;
  }
}

@Pipe({ name: 'calculate', pure: false })
export class CalculatePipe implements PipeTransform {
  private readonly data = inject(CeilingCalculator).data;
  protected readonly price = signal(0);

  private sizePrice() {
    const data = this.data()!;
    const price = typeOptions().find((a) => a.id === data?.type)?.price;
    const count = data.size;
    return count && price && count * price;
  }

  private profilePrice() {
    const data = this.data()!;
    const price = wallProfile().find((a) => a.id === data?.profile)?.price;
    const count = data.perimeter;
    return count && price && count * price;
  }

  private сurtainRodsPrice() {
    const data = this.data()!;
    const count = data.сurtainRods;
    return count && count * 400;
  }

  private lightingPrice() {
    const data = this.data()!;
    const lighting = data.lighting;
    return lighting && lighting * 1000;
  }

  constructor() {
    effect(() => {
      const data = this.data();

      if (data) {
        let price = 0;
        [this.sizePrice(), this.profilePrice(), this.lightingPrice(), this.сurtainRodsPrice()].forEach(
          (p) => p && (price += p)
        );
        this.price.set(price);
      }
    });
  }

  transform(value: any): number {
    return this.price();
  }
}

@Component({
  selector: 'app-ceiling-calculator',
  templateUrl: './ceiling-calculator.html',
  imports: [FormImports, DataListOptionImports, CalculatePipe, TuiAmountPipe, PricePipe],
  providers: [
    provideNgIconLoader((name) => {
      return inject(HttpClient).get(`/price-calculation/${name}.svg`, { responseType: 'text' });
    }, withCaching()),
    provideIcons({
      lucideCalculator,
    }),
  ],
  host: {
    id: 'main',
  },
})
export class CeilingCalculator {
  private readonly destroyRef = inject(DestroyRef);
  private readonly sendForm = injectSendMessage(ymSubmitEvent);

  protected readonly typeOptions = typeOptions;
  protected readonly wallProfile = wallProfile;

  protected readonly minRange = signal(5);
  protected readonly maxRange = signal(150);

  protected readonly minPerimeter = signal(10);
  protected readonly maxPerimeter = signal(500);

  protected readonly ticksLabels = signal([this.minRange(), 50, 75, 100, this.maxRange()].map((a) => a + 'м²'));

  protected readonly form = new FormGroup({
    // name: new FormControl(undefined, [Validators.required]),
    phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    type: new FormControl(this.typeOptions()[0].id),
    size: new FormControl(this.minRange()),
    description: new FormControl(undefined),

    rooms: new FormControl<string[]>([]),
    lightings: new FormControl<string[]>([]),
    сurtainRods: new FormControl(0),
    profile: new FormControl(this.wallProfile()[0].id),
    lighting: new FormControl(0), // Люстры или светильники
    perimeter: new FormControl(this.minPerimeter()), // Периметр помещений
  });

  public readonly data = toSignal(this.form.valueChanges, { initialValue: this.form.value });

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
              // name: null,
              rooms: [],
              lightings: [],
              description: null,
              phone: null,
              сurtainRods: 0,
              lighting: 0,
              perimeter: this.minPerimeter(),
              size: this.minRange(),
              type: this.typeOptions()[0].id,
              profile: this.wallProfile()[0].id,
            });
            this.form.markAsUntouched();
          })
        )
        .subscribe();
    }
  }
}
