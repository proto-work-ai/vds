/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @nx/enforce-module-boundaries */
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { HlmIcon, HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideNgIconLoader, withCaching } from '@ng-icons/core';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { RouterModule } from '@angular/router';
import { ATTRIBUTE_TYPE_LIST } from '@metadb/core';
import { HttpClient } from '@angular/common/http';
import { KeyListValuePipe } from '@atlas/core';
import { TABLE_CELL_DATA } from '@atlas/table';

export function provideIconAttributeType() {
  return provideNgIconLoader(name => {
    return inject(HttpClient).get(`/meta/${name}.svg`, { responseType: 'text' });
  }, withCaching())
}

@Component({
  template: `
    @if(attrTypeList() | keyListValue: 'type':value; as item){
      <ng-icon hlm size="l" [name]="item.icon" />
    }
    `,
  imports: [
    HlmSidebarImports,
    HlmIconImports,
    HlmButtonImports,
    HlmIconImports,
    HlmDropdownMenuImports,
    HlmButtonImports,
    HlmIconImports,
    HlmInputImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmTableImports,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgIcon,
    HlmIcon,
    KeyListValuePipe,
  ],
  providers: [
    provideIconAttributeType(),
  ],
})
export class MetaAttributeType {
  protected readonly attrTypeList = signal(inject(ATTRIBUTE_TYPE_LIST));
  protected readonly value = inject(TABLE_CELL_DATA);
}
