import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SidebarWithNavigation } from './sidebar-with-navigation.component';
import { provideRouter } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const meta: Meta<SidebarWithNavigation> = {
  component: SidebarWithNavigation,
  title: 'Sidebar With',
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

type Story = StoryObj<SidebarWithNavigation>;

export const Primary: Story = {
  args: {},
};
