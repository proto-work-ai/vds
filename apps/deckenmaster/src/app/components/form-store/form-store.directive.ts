/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/component-selector */
import { Directive, inject, Injector, input, OnInit, DestroyRef } from '@angular/core';
import { injectLocalStorageValue } from '@atlas/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Directive({ selector: 'form[formGroupStore]' })
export class FormStore implements OnInit {
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formGroup = inject(FormGroupDirective);
  private formValue?: ReturnType<typeof injectLocalStorageValue>;
  protected formGroupStore = input.required<string>();

  private get form(): FormGroup {
    return this.formGroup.form;
  }

  ngOnInit(): void {
    this.formValue = injectLocalStorageValue(this.formGroupStore(), undefined, this.injector);

    if (this.formValue()) {
      const value = this.form.value ?? {};
      Object.assign(value, this.formValue());
      this.form.patchValue(value, { emitEvent: false });
    }

    // if (this.form.value.rooms) {
    //   console.log(this.form.value);
    // }

    this.form.valueChanges
      .pipe(
        tap((value) => this.formValue?.set(value)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
