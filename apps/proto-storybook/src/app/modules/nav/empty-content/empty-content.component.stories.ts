import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { EmptyContentComponent } from './empty-content.component';
import { provideRouter } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const meta: Meta<EmptyContentComponent> = {
  component: EmptyContentComponent,
  title: 'Empty Content',
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

type Story = StoryObj<EmptyContentComponent>;

export const Primary: Story = {
  args: {},
};
