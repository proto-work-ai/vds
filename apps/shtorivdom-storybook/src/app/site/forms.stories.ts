import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SiteConsent, SiteField, SiteLeadForm, SiteLeadFormState, SiteLeadFormVariant, SiteLeadSection, SitePhoneMask } from '@shtorivdom/site-kit';
import { ASSETS, siteDecorators } from './site-story';

const meta: Meta = {
  title: 'Сайт/Формы',
  decorators: [...siteDecorators, moduleMetadata({ imports: [SiteConsent, SiteField, SiteLeadForm, SiteLeadSection, SitePhoneMask] })],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Поля: StoryObj = {
  render: () => ({
    props: { phone: '' },
    template: `
      <div class="wrap grid gap-8 py-10 md:grid-cols-2">
        <div><label class="field-label" for="f1">Имя — пустое</label><input siteField id="f1" placeholder="Введите имя" /></div>
        <div><label class="field-label" for="f2">Имя — фокус</label><input siteField id="f2" placeholder="Введите имя" class="is-focus" /></div>
        <div><label class="field-label" for="f3">Город — заполненное</label><input siteField id="f3" value="Подольск" /></div>
        <div>
          <label class="field-label" for="f4">Телефон * — ошибка</label>
          <input siteField id="f4" [error]="true" value="+7 (925" />
          <p class="mt-2 text-[12px] text-[#c0392b]">Введите номер телефона полностью</p>
        </div>
        <div>
          <label class="field-label" for="f5">Телефон с маской +7 (___) ___-__-__</label>
          <input siteField id="f5" placeholder="Укажите телефон" [(sitePhoneMask)]="phone" />
          <p class="mt-2 text-[12px] text-slate/60">Значение: {{ phone || '—' }}</p>
        </div>
        <div><label class="field-label" for="f6">Комментарий — textarea</label><textarea siteField id="f6" rows="3" placeholder="Комментарий"></textarea></div>
        <div class="md:col-span-2 grid gap-6 md:grid-cols-2">
          <div class="bg-white p-6"><p class="mb-3 text-[12px] text-slate/60">Согласие — обычное</p><site-consent /></div>
          <div class="bg-white p-6"><p class="mb-3 text-[12px] text-slate/60">Согласие — ошибка</p><site-consent [error]="true" /></div>
        </div>
      </div>
    `,
  }),
};

export const ПоляПервогоЭкрана: StoryObj = {
  name: 'Поля первого экрана',
  render: () => ({
    props: { phone: '' },
    template: `
      <div class="flex flex-wrap items-start gap-8 bg-navy p-10">
        <div class="w-full max-w-[400px]">
        <p class="mb-3 text-[12px] font-bold tracking-[.15em] text-gold uppercase">Обычное</p>
        <div class="rounded-[4px] bg-cream/95 px-6 py-8 sm:px-8">
          <div class="flex flex-col gap-6">
            <label class="flex items-center gap-3 border-b border-gold pb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="2" class="shrink-0"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input type="text" placeholder="Введите имя" class="h-10 w-full bg-transparent text-[16px] outline-none placeholder:text-slate/60" />
            </label>
            <label class="flex items-center gap-3 border-b border-gold pb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="2" class="shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <input placeholder="Укажите телефон" class="h-10 w-full bg-transparent text-[16px] outline-none placeholder:text-slate/60" [(sitePhoneMask)]="phone" />
            </label>
          </div>
        </div>
        </div>
        <div class="w-full max-w-[400px]">
        <p class="mb-3 text-[12px] font-bold tracking-[.15em] text-gold uppercase">Ошибка в телефоне</p>
        <div class="rounded-[4px] bg-cream/95 px-6 py-8 sm:px-8">
          <div class="flex flex-col gap-6">
            <div>
              <label class="flex items-center gap-3 border-b border-[#c0392b] pb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="2" class="shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <input value="+7 (9" class="h-10 w-full bg-transparent text-[16px] outline-none" />
              </label>
              <p class="mt-2 text-[12px] text-[#c0392b]">Введите номер телефона полностью</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    `,
  }),
};

type FormArgs = { variant: SiteLeadFormVariant; state: SiteLeadFormState };

export const ФормаЗаявки: StoryObj<FormArgs> = {
  name: 'Форма заявки',
  args: { variant: 'lead', state: 'idle' },
  argTypes: {
    variant: { name: 'вид', control: 'inline-radio', options: ['lead', 'hero', 'partner'], description: 'lead — общая, hero — первый экран, partner — анкета' },
    state: { name: 'состояние', control: 'inline-radio', options: ['idle', 'errors', 'done'] },
  },
  render: (args) => ({
    props: { ...args, photo: ASSETS + 'img/hero.jpg' },
    template: `
      @if (variant === 'hero') {
        <div class="relative overflow-hidden bg-navy p-6 sm:p-12">
          <img [src]="photo" alt="" class="absolute inset-0 size-full object-cover opacity-90" />
          <div class="absolute inset-0 bg-[linear-gradient(115deg,rgb(13_34_61/.82)_0%,rgb(13_34_61/.5)_55%,rgb(13_34_61/.2)_100%)]"></div>
          <div class="relative max-w-[400px] rounded-[4px] bg-cream/95 px-6 py-8 shadow-[0_20px_60px_rgb(0_0_0/.25)] backdrop-blur sm:px-8">
            <p class="mb-6 font-serif text-[24px] leading-tight font-bold">Оставьте заявку дизайнеру:</p>
            <site-lead-form variant="hero" [state]="state" />
          </div>
        </div>
      } @else {
        <div class="bg-sand p-6 sm:p-12">
          <div class="max-w-[720px] rounded-[4px] border border-navy/5 bg-white px-5 py-8 shadow-[0_8px_40px_rgb(13_34_61/.08)] sm:px-10 sm:py-12">
            <site-lead-form [variant]="variant" [state]="state" />
          </div>
        </div>
      }
    `,
  }),
};

export const ФормаЗаявкиТелефон: StoryObj<FormArgs> = {
  ...ФормаЗаявки,
  name: 'Форма заявки — телефон',
  globals: { viewport: { value: 'phone375', isRotated: false } },
};

export const СекцияЗаявки: StoryObj<{ state: SiteLeadFormState }> = {
  name: 'Секция «Заявка»',
  args: { state: 'idle' },
  argTypes: { state: { name: 'состояние', control: 'inline-radio', options: ['idle', 'errors', 'done'] } },
  render: (args) => ({ props: args, template: `<site-lead-section [state]="state" />` }),
};

export const Спасибо: StoryObj = {
  name: 'Спасибо и ошибки',
  render: () => ({
    template: `
      <div class="grid gap-1 md:grid-cols-2">
        <div class="bg-white p-10"><site-lead-form state="done" /></div>
        <div class="bg-white p-10"><site-lead-form state="errors" /></div>
      </div>
    `,
  }),
};
