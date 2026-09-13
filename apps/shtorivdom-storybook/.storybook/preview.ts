import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { componentWrapperDecorator, type Preview } from '@storybook/angular';

@Component({
  selector: 'app-storybook-wrapper',
  template: ``,
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorybookWrapperComponent {}

const preview: Preview = {
  // decorators: [componentWrapperDecorator(StorybookWrapperComponent)],
};

export default preview;
