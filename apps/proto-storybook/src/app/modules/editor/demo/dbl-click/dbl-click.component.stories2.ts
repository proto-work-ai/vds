import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DemoDblClickComponent } from './dbl-click.component';

const meta: Meta<DemoDblClickComponent> = {
  title: 'Editor',
  component: DemoDblClickComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule], // Add RouterTestingModule here
    }),
  ],
  parameters: {
    angular: {
      // Use applicationConfig for modern Angular versions (e.g., 16+)
      applicationConfig: {
        providers: [
          provideRouter([]), // Provide an empty routes array
          // You can also provide mock location services if needed
          // provideLocationMocks(),
        ],
      },
    },
  },
};
export default meta;

type Story = StoryObj<DemoDblClickComponent>;

export const Primary: Story = {
  args: {},
};
