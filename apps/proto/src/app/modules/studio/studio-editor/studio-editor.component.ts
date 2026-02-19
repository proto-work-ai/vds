/* eslint-disable @nx/enforce-module-boundaries */
import { Component, signal } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { RouterOutlet } from '@angular/router';
import { HlmIcon, HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'proto-studio-editor',
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
    RouterOutlet,
    RouterOutlet,
  ],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
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

  protected readonly menuItems = [
    { title: 'Visualizer', url: '#', icon: '' },
    { title: 'Console', url: '#', icon: '' },
  ];

  protected readonly schemaTables = [
    { title: 'Table1', url: '#', icon: '' },
    { title: 'Table2', url: '#', icon: '' },
  ];

  projects = [{ name: 'Design Engineering', url: '#', icon: 'lucideFrame' }];
}
