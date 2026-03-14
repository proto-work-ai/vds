/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,
  DestroyRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMaximize, lucideMinimize } from '@ng-icons/lucide';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { FlexRenderDirective } from '@tanstack/angular-table';

@Component({
  selector: 'atlas-data-table-toggle-size',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlexRenderDirective,
    FormsModule,
    HlmDropdownMenuImports,
    HlmButtonImports,
    NgIcon,
    HlmIconImports,
    HlmInputImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmTableImports,
    ReactiveFormsModule,
  ],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
    }),
  ],
  template: `
    <button hlmBtn size="icon" variant="outline" (click)="clickToggle()">
      <ng-icon
        hlm
        size="sm"
        [name]="toggleMaximize() ? 'lucideMinimize' : 'lucideMaximize'"
      ></ng-icon>
    </button>
  `,
})
export class AtlasDataTableToggleSize {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly toggleMaximize = signal(false);

  protected clickToggle() {
    this.toggleMaximize.update((a) => !a);
  }
}
