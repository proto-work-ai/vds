import { ChangeDetectionStrategy, Component, input, inject } from '@angular/core';
import { MetaAttribute } from '@metadb/client';
import { JsonPipe } from '@angular/common';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiTooltip } from '@taiga-ui/kit';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { PortalModule } from '@angular/cdk/portal';
import { TuiForm } from '@taiga-ui/layout';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { AttributeControlPipe } from '../pipes/attribute-control.pipe';
import { FieldAttributePortalPipe } from '../pipes/field-attribute-portal.pipe';

@Component({
  selector: 'atlas-form-fields',
  templateUrl: './form-fields.html',
  styleUrl: './form-fields.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TuiTextfield,
    HlmButtonImports,
    SortByPipe,
    PortalModule,
    TuiForm,
    JsonPipe,
    TuiIcon,
    TuiTooltip,
    AttributeControlPipe,
    FieldAttributePortalPipe,
  ],
  providers: [
    {
      provide: 'FORM_FIELDS',
      useValue: [
        {

        }
      ]
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtlasFormFields {
  readonly attribures = input.required<MetaAttribute[]>();
  protected readonly form = inject(FormGroupDirective).form;
}
