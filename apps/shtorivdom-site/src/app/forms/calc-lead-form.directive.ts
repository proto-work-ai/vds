import { Directive } from '@angular/core';
import { LeadFormDirective } from './lead-form.directive';

@Directive({ selector: 'form[data-calc-lead-form]', exportAs: 'calcLeadForm' })
export class CalcLeadFormDirective extends LeadFormDirective {}
