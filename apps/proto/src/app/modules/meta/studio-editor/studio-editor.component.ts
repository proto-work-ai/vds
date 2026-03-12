/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, signal } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HlmIcon, HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBox,
  lucideBraces,
  lucideDatabase,
  lucidePlus,
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
  lucideSearch,
  lucideDot,
  lucideLayersPlus,
  lucideLayers,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { injectContentMenu, injectStudioMenu } from './studio-editor.menu';

@Component({
  selector: 'proto-metadb-editor',
  templateUrl: './studio-editor.component.html',
  styleUrls: ['./studio-editor.component.scss'],
  imports: [
    HlmSidebarImports,
    HlmSidebarImports,
    HlmButtonImports,
    HlmIconImports,
    NgIcon,
    HlmIcon,
    HlmSidebarImports,
    HlmCollapsibleImports,
    BrnSelectImports,
    HlmSelectImports,
    ReactiveFormsModule,
    HlmSidebarImports,
    HlmButtonImports,
    HlmIconImports,
    NgIcon,
    HlmSeparator,
    HlmInputGroupImports,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideBraces,
      lucideRefreshCcw,
      lucideDatabase,
      lucidePlus,
      lucideBox,
      lucideSearch,
      lucideDot,
      lucideLayers,
    }),
  ],
})
export class StudioPageComponent {
  protected readonly schemaOptions = signal([
    { title: 'Public', value: 1 },
    { title: 'Apple', value: 2 },
  ]);

  protected readonly schemaControl = new FormControl(
    this.schemaOptions()[0].value,
  );

  protected readonly menuItems = injectStudioMenu();

  protected readonly contentMenu = injectContentMenu();
}
