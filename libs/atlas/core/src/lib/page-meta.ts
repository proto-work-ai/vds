/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export function setMeta<T>({ title, description }: { title: string; description: string }) {
  inject(Title).setTitle(title);
  inject(Meta).updateTag({ property: 'og:title', content: title });
  inject(Meta).updateTag({ name: 'description', content: description });
}
