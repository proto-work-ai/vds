import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phoneFormat' })
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string | number): string | number {
    if (!value) {
      return '';
    }

    // Remove all non-numeric characters
    const cleaned = (value + '').replace(/\D/g, '');

    // Check if the input is a valid 10-digit number
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+7 (${match[1]}) ${match[2]}-${match[3]}`;
    }

    return value; // Return original if formatting fails
  }
}
