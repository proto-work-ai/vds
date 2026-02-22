/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, computed, inject, signal } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HlmIcon, HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBox,
  lucideBraces,
  lucideDatabase,
  lucideLayersPlus,
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
  lucideSearch,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { ISignalMenuItem } from '../../../common/menu';
import { injectMenuItems } from './metadb-editor.menu';

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      'https://rtqfeiyenbdpnelcjcgw.supabase.co',
      'sb_publishable_sciAt1xTWNCwPp5qNX6j3g_k8EpHcD3',
    );
  }

  getTodos() {
    return this.supabase.from('todos').select('*');
  }
}

@Component({
  selector: 'proto-metadb-editor',
  templateUrl: './metadb-editor.component.html',
  styleUrls: ['./metadb-editor.component.scss'],
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
      lucideLayersPlus,
      lucideBox,
      lucideSearch,
    }),
  ],
})
export class StudioPageComponent {
  private sup = inject(SupabaseService);
  protected readonly schemaOptions = signal([
    { title: 'Public', value: 1 },
    { title: 'Apple', value: 2 },
  ]);

  protected readonly schemaControl = new FormControl(
    this.schemaOptions()[0].value,
  );

  protected readonly menuItems = injectMenuItems();

  ngOnInit(){
    this.sup.getTodos().then();
  }
}
