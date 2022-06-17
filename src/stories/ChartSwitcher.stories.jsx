import * as React from 'react';
import ChartToggler from '../components/ChartToggler';

export default {
  title: 'Example/ChartToggler',
  component: ChartToggler,
};

const Template = (args) => <ChartToggler {...args} />;

export const Enabled = Template.bind({});

Enabled.args = {
  isVisible: true,
};

export const Disabled = Template.bind({});

Disabled.args = {
  isVisible: false,
};
