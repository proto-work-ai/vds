/**
 * Example: Using Spartan NG and Taiga UI Components Together
 * This is a reference implementation showing how to use both libraries
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Spartan NG Helm Components
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmDialogModule } from '@spartan-ng/helm/dialog';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';

// Taiga UI Components
import { TuiRootModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/kit';
import { TuiCardModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-mcp-example',
  standalone: true,
  imports: [
    CommonModule,
    // Spartan NG
    HlmButtonDirective,
    HlmDialogModule,
    HlmInputDirective,
    HlmLabelDirective,
    HlmFormFieldModule,
    // Taiga UI
    TuiRootModule,
    TuiButtonModule,
    TuiCardModule,
  ],
  template: `
    <div class="p-8 space-y-6">
      <!-- Spartan NG Components Example -->
      <section>
        <h2 class="text-2xl font-bold mb-4">Spartan NG Components</h2>

        <!-- Button -->
        <div class="mb-4">
          <button hlmBtn (click)="onSpartanButtonClick()">
            Spartan NG Button
          </button>
        </div>

        <!-- Form Field -->
        <div hlmFormField class="mb-4">
          <label hlmLabel>Enter your name</label>
          <input hlmInput placeholder="John Doe" />
        </div>

        <!-- Dialog -->
        <button hlmBtn (click)="dialog.open()">Open Dialog</button>
      </section>

      <!-- Taiga UI Components Example -->
      <section>
        <h2 class="text-2xl font-bold mb-4">Taiga UI Components</h2>

        <!-- Taiga Button -->
        <div class="mb-4">
          <button tuiButton appearance="primary" (click)="onTaigaButtonClick()">
            Taiga UI Button
          </button>
        </div>

        <!-- Taiga Card -->
        <div tuiCard class="p-4 border rounded">
          <h3 class="font-semibold mb-2">Taiga UI Card</h3>
          <p class="text-sm text-gray-600">
            This is an example of a Taiga UI card component.
          </p>
        </div>
      </section>

      <!-- Mixed Components Example -->
      <section>
        <h2 class="text-2xl font-bold mb-4">Mixed Components</h2>
        <div class="flex gap-4">
          <button hlmBtn>Spartan Button</button>
          <button tuiButton appearance="secondary">Taiga Button</button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: inherit;
      color: inherit;
    }
  `],
})
export class McpExampleComponent {
  onSpartanButtonClick(): void {
    console.log('Spartan NG button clicked!');
  }

  onTaigaButtonClick(): void {
    console.log('Taiga UI button clicked!');
  }
}

/**
 * USAGE IN YOUR APP:
 *
 * 1. Import the component in your parent component or app:
 *    import { McpExampleComponent } from './mcp-example.component';
 *
 * 2. Add to imports:
 *    @Component({
 *      imports: [McpExampleComponent],
 *      template: `<app-mcp-example />`
 *    })
 *
 * 3. Make sure app config has Taiga UI event plugins:
 *    import { provideEventPlugins } from '@taiga-ui/event-plugins';
 *    export const appConfig: ApplicationConfig = {
 *      providers: [
 *        provideEventPlugins(),
 *        // ... other providers
 *      ]
 *    }
 */
