import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { filter, switchMap } from 'rxjs';
import { SendModal } from './send.modal';

export interface IFormData {
  name?: string;
  phone?: string | number;
  type?: string;
  size?: number;
  description?: string;
  rooms?: { id: number; title: string; icon: string }[];
  lightings?: { id: number; title: string; icon: string }[];
}

export interface IDataSendItem {
  title: string;
  values: (string | number)[];
}

export function buldDataSend(data: IFormData): IDataSendItem[] {
  const result: IDataSendItem[] = [];

  if (data.name || data.phone) {
    const values: string[] = [];
    if (data.name) {
      values.push(data.name);
    }
    if (data.phone) {
      values.push('+7' + data.phone);
    }
    result.push({ title: 'Контакты:', values });
  }

  if (data.type) {
    result.push({ title: 'Тип потолка:', values: [data.type] });
  }

  if (data.size) {
    result.push({ title: 'Площадь:', values: [data.size + 'м²'] });
  }

  if (data.rooms?.length) {
    result.push({ title: 'Тип комнаты:', values: data.rooms.map((a) => a.title) });
  }

  if (data.lightings?.length) {
    result.push({ title: 'Освещение:', values: data.lightings.map((a) => a.title) });
  }

  if (data.description) {
    result.push({ title: 'Пожелание:', values: [data.description] });
  }

  return result;
}

export function buldHtmlSend(items: IDataSendItem[]): string {
  const result = `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; padding-left: 0.75rem; padding-right: 0.75rem;">
        ${items
          .map(
            (item) => `
            <section style="display: flex; align-items: center; gap: 0.75rem">
                <div style="text-align: end; font-weight: 500">${item.title}</div>

                <article style="display: flex; flex: 1 1 0%; gap: 0.75rem">

                    ${item.values
                      .map(
                        (value) => `
                            <div  style="border-radius: 9999px;background-color: #e5e7eb;padding-left: 1rem;padding-right: 1rem;padding-top: 0.5rem;padding-bottom: 0.5rem;"
                        >${value}</div>
                        `
                      )
                      .join('')}

                </article>
            </section>
            `
          )
          .join('')}
    </div>
  `;
  return result;
}

export function getTestHtml() {
  const items = buldDataSend({
    name: 'fgnfgn',
    phone: '9859936718',
    type: 'Матовый',
    size: 70,
    description: 'fghnnnnnnnnnnnnn',
    rooms: [
      { id: 2, title: 'Гостинная', icon: 'room-2' },
      { id: 3, title: 'Спальная', icon: 'room-3' },
      { id: 4, title: 'Детская', icon: 'room-4' },
      { id: 6, title: 'Туалет', icon: 'room-6' },
    ],
    lightings: [
      { id: 1, title: 'Светильник', icon: 'lighting-1' },
      { id: 2, title: 'Люстра', icon: 'lighting-2' },
    ],
  });

  const html = buldHtmlSend(items);
  console.log(html);
  return html;
}

export function injectSendMessage() {
  const http = inject(HttpClient);
  const destroyRef = inject(DestroyRef);
  const dialog = inject(TuiDialogService);
  return (data: IFormData) => {
    const items = buldDataSend(data);
    const message = buldHtmlSend(items);
    return http.post('/api/send-message.php', { message }).pipe(
      // return of(0).pipe(
      switchMap(() => {
        return dialog.open('Мы скоро с вами свяжемся.', { label: 'Ваша заявка успешно отправлена!', size: 's' });
      }),
      takeUntilDestroyed(destroyRef)
    );
  };
}

export function injectPhoneSendModal() {
  const destroyRef = inject(DestroyRef);
  const dialog = inject(TuiDialogService);
  const sendMessage = injectSendMessage();

  return () => {
    dialog
      .open<IFormData>(new PolymorpheusComponent(SendModal), {
        label: 'Оставить заявку',
        size: 's',
      })
      .pipe(
        filter(Boolean),
        switchMap((data: IFormData) => sendMessage(data)),
        takeUntilDestroyed(destroyRef)
      )
      .subscribe();
  };
}
