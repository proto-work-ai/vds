import { Component, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { markAsSubmit } from '@atlas/core';
import { finalize } from 'rxjs';
import { provideNgIconLoader, withCaching } from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';
import { FormImports } from '../../../components/form';
import { IFormData, injectSendMessage, ymSubmitEvent } from '../../send-service/send.services';

interface MenuItem {
  id: number;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  imports: [FormImports],
  providers: [
    provideNgIconLoader((name) => {
      return inject(HttpClient).get(`/price-calculation/${name}.svg`, { responseType: 'text' });
    }, withCaching()),
  ],
})
export class OrderFormComponent {
  private readonly sendForm = injectSendMessage(ymSubmitEvent);
  protected readonly typeOptions = signal(['Матовый', 'Тканевый', 'Глянцевый', 'Сатиновый']);

  protected readonly minRange = signal(5);
  protected readonly maxRange = signal(150);
  protected readonly ticksLabels = signal([this.minRange(), 50, 75, 100, this.maxRange()].map((a) => a + 'м²'));

  protected readonly form = new FormGroup({
    rooms: new FormArray([
      new FormGroup({
        size: new FormControl(this.minRange()),
        type: new FormControl(this.typeOptions()[0]),

        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        phone: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),

        lightings: new FormControl<MenuItem[]>([]),

        description: new FormControl('', []),

        rooms: new FormControl<MenuItem[]>([]),
      })
    ]),
  });

  protected readonly rooms = signal<MenuItem[]>([
    { id: 1, title: 'Вся квартира', icon: 'room-1' },
    { id: 2, title: 'Гостиная', icon: 'room-2' },
    { id: 3, title: 'Спальня', icon: 'room-3' },
    { id: 4, title: 'Детская', icon: 'room-4' },
    { id: 5, title: 'Ванная', icon: 'room-5' },
    { id: 6, title: 'Туалет', icon: 'room-6' },
    { id: 7, title: 'Коридор', icon: 'room-7' },
    { id: 8, title: 'Другое', icon: 'room-8' },
  ] as const);

  protected readonly lightins = signal<MenuItem[]>([
    { id: 1, title: 'Светильник', icon: 'lighting-1' },
    { id: 2, title: 'Люстра', icon: 'lighting-2' },
    { id: 3, title: 'Световые линии', icon: 'lighting-3' },
    { id: 4, title: 'LED подсветка ', icon: 'lighting-4' },
  ] as const);

  protected formSubmit(): void {
    if (markAsSubmit(this.form)) {
      this.sendForm(this.form.value as IFormData)
        .pipe(
          finalize(() => {
            // this.form.patchValue({
            //   type: this.typeOptions()[0],
            //   size: this.minRange(),
            //   phone: null,
            // });
            this.form.markAsUntouched();
          })
        )
        .subscribe();
    }
  }

  constructor() {
    this.form.valueChanges.subscribe((value) => {
      console.log('value', value);
    });
  }
}
