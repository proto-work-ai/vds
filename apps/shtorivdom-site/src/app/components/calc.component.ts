import { RouterLink } from '@angular/router';
import { LeadStatus } from '../forms/lead-status';
import { RevealDirective } from './reveal.directive';
import { DeferDirective } from './defer.component';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiCheckbox, TuiInput, TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { ContactLinksDirective } from '../contact-links.directive';
import { CalcLeadFormDirective } from '../forms/calc-lead-form.directive';
import { LeadFormDirective } from '../forms/lead-form.directive';

type CalcItem = {
  key: string;
  title: string;
  unit: string;
  min: number;
  image: string;
};

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LeadStatus,
    RevealDirective,
    DeferDirective,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInput,
    TuiInputPhone,
    TuiTextarea,
    TuiCheckbox,
    CalcLeadFormDirective,
    LeadFormDirective,
    ContactLinksDirective,
  ],
})
export class CalcComponent {
  protected readonly items: CalcItem[] = [
    ['blackout-curtains', 'Шторы блэкаут', 'м.пог.', 2500, 'blackout-curtains/image-5.jpg'],
    ['roman-blinds', 'Римские шторы', 'м²', 4500, 'roman-blinds/image-1.jpg'],
    ['roller-blinds', 'Рулонные шторы', 'м²', 2200, 'roller-blinds/image-2.jpg'],
    ['linen-curtains', 'Льняные шторы', 'м.пог.', 2800, 'linen-curtains/image-3.jpg'],
    ['pleated-blinds', 'Шторы плиссе', 'м²', 3500, 'pleated-blinds/image-1.jpg'],
    ['blinds', 'Жалюзи', 'м²', 1500, 'blinds/image-1.jpg'],
  ].map(([key, title, unit, min, image]) => ({
    key,
    title,
    unit,
    min,
    image: `../assets/img/catalog/${image}`,
  })) as CalcItem[];
  protected readonly selectedKey = signal(this.items[0].key);
  protected readonly width = signal(250);
  protected readonly height = signal(260);
  protected readonly fullness = signal(2);
  protected readonly rod = signal(false);
  protected readonly selected = computed(
    () => this.items.find((item) => item.key === this.selectedKey()) ?? this.items[0],
  );
  protected readonly byMeter = computed(() => this.selected().unit === 'м.пог.');
  protected readonly invalidSize = computed(
    () => this.width() < 30 || this.width() > 1500 || this.height() < 30 || this.height() > 600,
  );
  protected readonly calculation = computed(() => {
    if (this.invalidSize()) return { rows: [], total: 0, summary: '' };
    const item = this.selected();
    const widthMeters = this.width() / 100;
    const heightMeters = this.height() / 100;
    const rows: [string, string][] = [];
    let total = 0;
    if (this.byMeter()) {
      const fabric = Math.ceil((widthMeters * this.fullness() + 0.2) * 10) / 10;
      const cut = Math.ceil((heightMeters + 0.3) * 10) / 10;
      total = fabric * item.min;
      rows.push(
        ['Ширина × пышность', `${this.width()} см × ${this.fullness()}`],
        ['Ткани нужно', `${fabric.toString().replace('.', ',')} м.пог.`],
        ['Высота полотна с подгибами', `${cut.toString().replace('.', ',')} м`],
      );
      if (cut > 3) rows.push(['Внимание', 'выше 3 м — нужна ткань большой высоты или сшивка']);
    } else {
      const area = Math.ceil(widthMeters * heightMeters * 10) / 10;
      total = area * item.min;
      rows.push(['Площадь', `${area.toString().replace('.', ',')} м²`]);
    }
    if (this.rod()) {
      const rodPrice = Math.ceil(this.width() / 100) * 900;
      total += rodPrice;
      rows.push(['Карниз', `от ${this.formatMoney(rodPrice)} ₽`]);
    }
    return {
      rows,
      total,
      summary: [
        item.title,
        `${this.byMeter() ? 'Ширина карниза × высота' : 'Ширина × высота окна'}: ${this.width()} × ${this.height()} см`,
        ...rows.map(([label, value]) => `${label}: ${value}`),
        `Ориентировочно от ${this.formatMoney(total)} ₽`,
      ].join('; '),
    };
  });

  protected formatMoney(value: number): string {
    return Math.round(value).toLocaleString('ru-RU');
  }

  protected selectItem(key: string): void {
    this.selectedKey.set(key);
  }

  protected selectCard(key: string, event: MouseEvent): void {
    if (event.target instanceof HTMLInputElement) return;
    event.preventDefault();
    this.selectItem(key);
  }

  protected setNumber(target: 'width' | 'height', event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (target === 'width') this.width.set(value);
    else this.height.set(value);
  }

  protected setFullness(event: Event): void {
    this.fullness.set(Number((event.target as HTMLInputElement).value));
  }

  protected setRod(event: Event): void {
    this.rod.set((event.target as HTMLInputElement).checked);
  }
}
