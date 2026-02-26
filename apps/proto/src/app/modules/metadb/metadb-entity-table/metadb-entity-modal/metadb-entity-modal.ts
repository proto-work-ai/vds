/* eslint-disable @nx/enforce-module-boundaries */
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import {
  HlmDialogDescription,
  HlmDialogHeader,
  HlmDialogImports,
  HlmDialogTitle,
} from '@spartan-ng/helm/dialog';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { MetaEntity } from '@metadb/client';
import { FormType } from '@atlas/core';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { MetaDbEntityService } from '../../services/metadb-entity.service';

export interface MetaEntityModalData {
  name: string;
  email: string;
  phone: string;
};

@Component({
  selector: 'proto-metadb-entity-modal',
  imports: [
    HlmDialogHeader,
    HlmDialogTitle,
    HlmTableImports,
    HlmDialogImports,
    HlmTableImports,
    HlmInputImports,
    HlmButtonImports,
    HlmInputImports,
    ReactiveFormsModule,
    HlmCheckboxImports,
    HlmTextareaImports,
    HlmButtonImports,
    HlmInputImports,
    BrnSelectImports,
    HlmSelectImports,
    ReactiveFormsModule,
    HlmFormFieldImports,
    HlmFieldImports,
  ],
  providers: [provideIcons({ lucideCheck })],
  host: {
    class: 'flex flex-col gap-4',
  },
  templateUrl: 'metadb-entity-modal.html',
})
export class MetaEntityModal {
  private readonly dialogRef = inject<BrnDialogRef<boolean>>(BrnDialogRef);
  private readonly context = injectBrnDialogContext<MetaEntityModalData>();
  private readonly entityService = inject(MetaDbEntityService);

  public form = new FormGroup<FormType<MetaEntity>>({
    id: new FormControl(undefined),
    title: new FormControl(undefined, [Validators.required]),
    description: new FormControl(undefined),
    // name: new FormControl(undefined, [Validators.required]),
    disable: new FormControl(false),
    readonly: new FormControl(false),
  });

  constructor(){
    this.entityService.getAll().subscribe();
  }

  public selectUser() {
    this.dialogRef.close(true);
  }
}
