import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { componentWrapperDecorator, type Preview } from '@storybook/angular';
import { TuiRoot } from '@taiga-ui/core';

@Component({
  selector: 'app-storybook-wrapper',
  template: ``,
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorybookWrapperComponent {}

const preview: Preview = {
  // decorators: [componentWrapperDecorator(TuiRoot)],
};

export default preview;
