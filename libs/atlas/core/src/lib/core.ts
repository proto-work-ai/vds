import { FormControl } from '@angular/forms';

export type FormType<T> = {
  readonly [K in keyof T]?: FormControl<T[K] | undefined>;
};
