/* eslint-disable @nx/enforce-module-boundaries */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { RouterOutlet } from '@angular/router';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMaximize, lucideMinimize, lucideRefreshCcw } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { AppSidebar } from '../home-sidebar/home-sidebar.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [
    provideIcons({
      lucideMaximize,
      lucideMinimize,
      lucideRefreshCcw,
    }),
    // provideBrnButtonConfig({ variant: 'ghost', size: 'icon' }),
  ],
  imports: [
    AppSidebar,
    RouterOutlet,
    NgIcon,
    HlmSidebarImports,
    HlmIconImports,
    HlmButtonImports,
    HlmIconImports,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {}
