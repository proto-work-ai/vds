import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

@Component({
  selector: 'proto-histogramt',
  template: '',
})
class HistogramComponent {}

const meta: Meta<HistogramComponent> = {
  component: HistogramComponent,
};

export default meta;
type Story = StoryObj<HistogramComponent>;

export const Basic: Story = {
  args: {
    dataType: 'latency',
    showHistogramLabels: true,
    histogramAccentColor: '#1EA7FD',
    label: 'Latency distribution',
  },
};
