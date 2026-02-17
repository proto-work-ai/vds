/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { AppSidebar } from '../../features/sidebar/sidebar.component';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [AppSidebar, HlmSidebarImports, RouterOutlet],
})
export class MainComponent {}
