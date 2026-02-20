import type { Meta, StoryObj } from '@storybook/angular';
import { NxWelcome } from './nx-welcome';

const meta: Meta<NxWelcome> = {
  component: NxWelcome,
  title: 'NxWelcome',
};
export default meta;

type Story = StoryObj<NxWelcome>;

export const Primary: Story = {
  args: {},
};
