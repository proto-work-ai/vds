import { FormArray, FormGroup, NgForm } from '@angular/forms';

export function markAsSubmit(
  form: NgForm | FormGroup | FormArray,
  updateValueAndValidity = true,
): boolean {
  function fn(controls: typeof form.controls) {
    Object.keys(controls)
      .map((key) => (controls as any)[key])
      .forEach((control) => {
        if (control.controls) {
          fn(control.controls);
        } else {
          control.markAsDirty();
          control.markAsTouched();

          if (updateValueAndValidity) {
            control.updateValueAndValidity();
          }
        }
      });
  }

  if (form?.controls) {
    fn(form.controls);
  }

  return form?.valid ?? false;
}
