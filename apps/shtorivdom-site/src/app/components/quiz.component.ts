import { DeferDirective } from './defer.component';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiCheckbox, TuiError, TuiInput, TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhone, TuiTextarea } from '@taiga-ui/kit';
import { ContactLinksDirective } from '../contact-links.directive';
import { LeadFormDirective } from '../forms/lead-form.directive';

type QuizAnswer = { room?: string; light?: string; window?: string; style?: string };

type Recommendation = {
  key: string;
  title: string;
  unit: string;
  min: number;
  image: string;
  href: string;
};

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DeferDirective,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInput,
    TuiInputPhone,
    TuiTextarea,
    TuiCheckbox,
    TuiError,
    LeadFormDirective,
    ContactLinksDirective,
  ],
})
export class QuizComponent {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly quizLead = viewChild(LeadFormDirective);
  protected readonly step = signal(0);
  protected readonly answers = signal<QuizAnswer>({});
  protected readonly totalSteps = 4;
  protected readonly complete = computed(() => this.step() >= this.totalSteps);
  protected readonly currentAnswer = computed(() => {
    const keys: (keyof QuizAnswer)[] = ['room', 'light', 'window', 'style'];
    return this.answers()[keys[this.step()]];
  });
  protected readonly canNext = computed(() => this.complete() || !!this.currentAnswer());
  protected readonly progress = computed(
    () =>
      (Math.min(this.step() + (this.complete() ? 0 : 1), this.totalSteps) / this.totalSteps) * 100,
  );
  protected readonly summary = computed(() => {
    const answers = this.answers();
    return `Комната: ${answers.room ?? '—'}; Свет: ${answers.light ?? '—'}; Окно: ${answers.window ?? '—'}; Стиль: ${answers.style ?? '—'}`;
  });
  protected readonly recommendations = computed(() => {
    const scores: Record<string, number> = {};
    const add = (values: Record<string, number>) =>
      Object.entries(values).forEach(([key, value]) => (scores[key] = (scores[key] ?? 0) + value));
    const answers = this.answers();
    const scoreMap: Record<string, Record<string, Record<string, number>>> = {
      room: {
        bedroom: { 'blackout-curtains': 3, 'roman-blinds': 1 },
        living: { 'linen-curtains': 2, 'blackout-curtains': 1 },
        kids: { 'blackout-curtains': 2, 'roller-blinds': 2 },
        kitchen: { 'roman-blinds': 3, 'roller-blinds': 2 },
        office: { blinds: 3, 'roller-blinds': 2 },
        other: { 'linen-curtains': 1, 'roller-blinds': 1 },
      },
      light: {
        dark: { 'blackout-curtains': 4, 'roller-blinds': 1 },
        soft: { 'linen-curtains': 3, 'roman-blinds': 1 },
        privacy: { 'pleated-blinds': 2, 'roller-blinds': 2, blinds: 2 },
        decor: { 'roman-blinds': 2, 'linen-curtains': 2 },
      },
      window: {
        standard: {},
        panoramic: { 'linen-curtains': 2, 'blackout-curtains': 1 },
        attic: { 'pleated-blinds': 4, 'roller-blinds': 1 },
        door: { 'roller-blinds': 2, blinds: 2 },
      },
      style: {
        classic: { 'roman-blinds': 2, 'blackout-curtains': 1 },
        modern: { 'roller-blinds': 2, blinds: 2 },
        eco: { 'linen-curtains': 3, 'roman-blinds': 1 },
      },
    };
    Object.entries(answers).forEach(([question, answer]) => {
      if (answer) add(scoreMap[question]?.[answer] ?? {});
    });
    return this.catalog
      .filter((item) => scores[item.key])
      .sort((a, b) => (scores[b.key] ?? 0) - (scores[a.key] ?? 0))
      .slice(0, 2);
  });

  protected readonly catalog: Recommendation[] = [
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
    href: `../catalog/${key}/`,
  })) as Recommendation[];

  protected selectAnswer(event: Event): void {
    const input = event.target as HTMLInputElement;
    const question = input.name as keyof QuizAnswer;
    this.answers.update((answers) => ({ ...answers, [question]: input.value }));
  }

  protected next(): void {
    if (this.canNext() && !this.complete()) this.step.update((value) => value + 1);
  }

  protected back(): void {
    this.step.update((value) => Math.max(0, value - 1));
  }

  protected restart(): void {
    this.answers.set({});
    this.step.set(0);
    this.element.nativeElement.querySelectorAll('input[type="radio"]').forEach((input: Element) => {
      if (!(input instanceof HTMLInputElement)) return;
      input.checked = false;
      input.blur();
    });
    this.quizLead()?.reset();
    requestAnimationFrame(() => {
      const quiz = this.element.nativeElement.querySelector('[data-quiz]') as HTMLElement | null;
      if (!quiz) return;
      const top = Math.max(0, quiz.getBoundingClientRect().top + window.scrollY - 100);
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }
}
