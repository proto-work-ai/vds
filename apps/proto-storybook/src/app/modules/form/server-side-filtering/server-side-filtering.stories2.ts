import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ServerSideFiltering } from './server-side-filtering.component';

const meta: Meta<ServerSideFiltering> = {
  component: ServerSideFiltering,
  title: 'Server Side Filtering',
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

type Story = StoryObj<ServerSideFiltering>;

export const Primary: Story = {
  args: {},
};
