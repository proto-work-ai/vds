/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/component-selector */
import { Directive, inject, Injector, input, OnInit, DestroyRef } from '@angular/core';
import { injectLocalStorage } from '@atlas/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Directive({ selector: 'form[formGroupStore]' })
export class FormGroupStore implements OnInit {
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formGroup = inject(FormGroupDirective);
  private value?: ReturnType<typeof injectLocalStorage>;
  public readonly formGroupStore = input.required<string>();

  private get form(): FormGroup {
    return this.formGroup.form;
  }

  ngOnInit(): void {
    this.value = injectLocalStorage(this.formGroupStore(), { injector: this.injector });

    if (this.value()) {
      const value = this.form.value ?? {};
      Object.assign(value, this.value());
      this.form.patchValue(value, { emitEvent: false });
    }
    // if (this.form.value.rooms) {
    //   console.log(this.form.value);
    // }

    this.form.valueChanges
      .pipe(
        tap((value) => this.value?.set(value)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
