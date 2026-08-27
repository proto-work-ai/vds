/**
 * Example: Taiga UI MCP Components Usage
 * Demonstrates how to use Taiga UI components with full MCP integration
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Taiga UI Core
import { TuiRootModule } from '@taiga-ui/core';
import { TuiDialogService } from '@taiga-ui/core';

// Taiga UI Kit Components
import { TuiButtonModule } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiSelectModule } from '@taiga-ui/kit';
import { TuiCheckboxModule } from '@taiga-ui/kit';
import { TuiRadioModule } from '@taiga-ui/kit';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';
import { TuiTabsModule } from '@taiga-ui/kit';
import { TuiAccordionModule } from '@taiga-ui/kit';
import { TuiPaginationModule } from '@taiga-ui/kit';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { TuiCardModule } from '@taiga-ui/kit';
import { TuiLoaderModule } from '@taiga-ui/kit';

// Taiga UI Layout
import { TuiSidebarModule } from '@taiga-ui/layout';

// Icons
import { TuiIconModule } from '@taiga-ui/core';

@Component({
  selector: 'app-taiga-ui-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // Core
    TuiRootModule,
    TuiIconModule,
    // Kit
    TuiButtonModule,
    TuiInputModule,
    TuiSelectModule,
    TuiCheckboxModule,
    TuiRadioModule,
    TuiBreadcrumbsModule,
    TuiTabsModule,
    TuiAccordionModule,
    TuiPaginationModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiCardModule,
    TuiLoaderModule,
    // Layout
    TuiSidebarModule,
  ],
  template: `
    <tui-root class="min-h-screen">
      <div class="p-8 space-y-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold mb-2">Taiga UI MCP Demo</h1>
          <p class="text-gray-600">Comprehensive showcase of Taiga UI components</p>
        </div>

        <!-- Buttons Section -->
        <section>
          <h2 class="text-2xl font-bold mb-4">Buttons</h2>
          <div class="flex gap-4 flex-wrap">
            <button tuiButton appearance="primary" (click)="onButtonClick()">
              Primary Button
            </button>
            <button tuiButton appearance="secondary">Secondary Button</button>
            <button tuiButton appearance="accent">Accent Button</button>
            <button tuiButton appearance="primary" disabled>Disabled</button>
            <button tuiButton appearance="flat">Flat Button</button>
          </div>
        </section>

        <!-- Inputs Section -->
        <section>
          <h2 class="text-2xl font-bold mb-4">Form Controls</h2>
          <div class="space-y-4 max-w-md">
            <!-- Text Input -->
            <div>
              <label class="block text-sm font-medium mb-2">Text Input</label>
              <input
                tuiTextfield
                [(ngModel)]="inputValue"
                placeholder="Enter text..."
                class="w-full"
              />
            </div>

            <!-- Select -->
            <div>
              <label class="block text-sm font-medium mb-2">Select</label>
              <tui-select
                [(ngModel)]="selectedOption"
                [tuiTextfieldCleaner]="true"
              >
                <tui-data-list-wrapper
                  *tuiSelectOptionContent
                  [items]="options"
                ></tui-data-list-wrapper>
              </tui-select>
            </div>

            <!-- Checkbox -->
            <div>
              <label class="flex items-center gap-2">
                <input
                  type="checkbox"
                  [tuiCheckbox]="true"
                  [(ngModel)]="isChecked"
                />
                <span>Accept terms and conditions</span>
              </label>
            </div>

            <!-- Radio Group -->
            <fieldset class="space-y-2">
              <legend class="text-sm font-medium mb-2">Choose an option</legend>
              <label class="flex items-center gap-2">
                <input type="radio" [tuiRadio]="'option1'" />
                <span>Option 1</span>
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" [tuiRadio]="'option2'" />
                <span>Option 2</span>
              </label>
            </fieldset>
          </div>
        </section>

        <!-- Breadcrumbs Section -->
        <section>
          <h2 class="text-2xl font-bold mb-4">Breadcrumbs</h2>
          <nav [tuiBreadcrumbs]="true">
            <a href="#" class="text-blue-500">Home</a>
            <a href="#" class="text-blue-500">Products</a>
            <a href="#" class="text-blue-500">Details</a>
            <span>Current Page</span>
          </nav>
        </section>

        <!-- Tabs Section -->
        <section>
          <h2 class="text-2xl font-bold mb-4">Tabs</h2>
          <tui-tabs [(activeItemIndex)]="activeTab">
            <button tuiTab>Tab 1</button>
            <button tuiTab>Tab 2</button>
            <button tuiTab>Tab 3</button>

            <ng-template tuiTabContent>
              <div class="p-4">Content for Tab 1</div>
            </ng-template>
            <ng-template tuiTabContent>
              <div class="p-4">Content for Tab 2</div>
            </ng-template>
            <ng-template tuiTabContent>
              <div class="p-4">Content for Tab 3</div>
            </ng-template>
          </tui-tabs>
        </section>

        <!-- Accordion Section -->
        <section>
          <h2 class="text-2xl font-bold mb-4">Accordion</h2>
          <tui-accordion
            [closeOthers]="true"
            [rounded]="true"
            [align]="'top'"
          >
            <tui-accordion-item
              *ngFor="let item of accordionItems; let i = index"
              [heading]="item.title"
            >
              {{ item.content }}
            </tui-accordion-item>
          </tui-accordion>
        </section>

        <!-- Card Section -->
        <section>
          <h2 class="text-2xl font-bold mb-4">Cards</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              class="p-4 border rounded-lg shadow-sm"
              tuiCard="bordered"
            >
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold">Card Title</h3>
                <span tuiBadge appearance="primary">New</span>
              </div>
              <p class="text-sm text-gray-600">
                This is a Taiga UI card component with badge notification.
              </p>
            </div>

            <div
              class="p-4 border rounded-lg shadow-sm"
              tuiCard="bordered"
            >
              <div class="flex items-center gap-3 mb-3">
                <img
                  tuiAvatar
                  src="https://via.placeholder.com/40"
                  alt="User"
                />
                <div>
                  <div class="font-semibold">User Name</div>
                  <div class="text-xs text-gray-500">@username</div>
                </div>
              </div>
              <p class="text-sm">User profile card example</p>
            </div>

            <div
              class="p-4 border rounded-lg shadow-sm"
              tuiCard="bordered"
            >
              <div class="flex justify-between items-center mb-3">
                <h3 class="font-semibold">Loading Example</h3>
                <div *ngIf="isLoading" tuiLoader></div>
              </div>
              <p class="text-sm text-gray-600">
                Click "Load Data" to see loader in action.
              </p>
            </div>
          </div>
        </section>

        <!-- Pagination Section -->
        <section>
          <h2 class="text-2xl font-bold mb-4">Pagination</h2>
          <tui-pagination
            [length]="20"
            [(page)]="currentPage"
            [size]="'m'"
          ></tui-pagination>
          <p class="mt-2 text-sm text-gray-600">
            Current page: {{ currentPage + 1 }}
          </p>
        </section>

        <!-- Footer -->
        <div class="pt-8 border-t text-center text-sm text-gray-500">
          <p>Taiga UI v5.7.0 - Market Component Platform</p>
        </div>
      </div>
    </tui-root>
  `,
  styles: [`
    :host {
      display: block;
      background: inherit;
      color: inherit;
    }

    tui-root {
      display: block;
      min-height: 100vh;
    }
  `],
})
export class TaigaUiExampleComponent {
  // State management
  inputValue = signal('');
  isChecked = signal(false);
  activeTab = signal(0);
  currentPage = signal(0);
  isLoading = signal(false);

  selectedOption: string | null = null;

  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  accordionItems = [
    {
      title: 'Accordion Item 1',
      content: 'Content for the first accordion item',
    },
    {
      title: 'Accordion Item 2',
      content: 'Content for the second accordion item',
    },
    {
      title: 'Accordion Item 3',
      content: 'Content for the third accordion item',
    },
  ];

  constructor(private dialogService: TuiDialogService) {}

  onButtonClick(): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Button clicked! Input value:', this.inputValue());
    }, 1500);
  }
}

/**
 * USAGE:
 *
 * 1. Import the component:
 *    import { TaigaUiExampleComponent } from './taiga-ui-example.component';
 *
 * 2. Add to imports in parent:
 *    imports: [TaigaUiExampleComponent]
 *
 * 3. Use in template:
 *    <app-taiga-ui-example />
 *
 * 4. Make sure app config has Taiga UI providers:
 *    import { provideTaigaUI } from './taiga-ui.config';
 *
 *    export const appConfig: ApplicationConfig = {
 *      providers: [
 *        ...provideTaigaUI(),
 *        // other providers
 *      ]
 *    }
 */
