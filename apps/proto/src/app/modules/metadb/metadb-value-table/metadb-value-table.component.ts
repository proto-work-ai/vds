/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { RouterOutlet } from '@angular/router';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMaximize,
  lucideMinimize,
  lucideRefreshCcw,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { AtlasDataTableComponent } from '../../atlas/data-table/data-table';

@Component({
  selector: 'proto-metadb-values',
  templateUrl: './metadb-value-table.component.html',
  styleUrls: ['./metadb-value-table.component.scss'],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
    }),
  ],
  imports: [
    HlmSidebarImports,
    HlmIconImports,
    HlmButtonImports,
    HlmIconImports,
    RouterOutlet,
    NgIcon,
    AtlasDataTableComponent
],
})
export class MetadbValuesComponent {}
