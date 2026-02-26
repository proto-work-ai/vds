import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AtlasRowSelectionTableComponent } from './row-selection-table';

const meta: Meta<AtlasRowSelectionTableComponent> = {
  component: AtlasRowSelectionTableComponent,
  title: 'Row Selection Table',
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

type Story = StoryObj<AtlasRowSelectionTableComponent>;

export const Primary: Story = {
  args: {},
};
