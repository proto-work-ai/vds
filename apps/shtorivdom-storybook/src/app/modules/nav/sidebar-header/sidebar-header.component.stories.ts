import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NavSidebarHeader } from './sidebar-header.component';
import { provideRouter } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const meta: Meta<NavSidebarHeader> = {
  component: NavSidebarHeader,
  title: 'Sidebar Header',
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

type Story = StoryObj<NavSidebarHeader>;

export const Primary: Story = {
  args: {},
};
