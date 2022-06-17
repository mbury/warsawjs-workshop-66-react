import * as React from 'react';
import { FILTER_OPTIONS } from '../commons/const';
import Filters from '../components/Filters';


export default {
  title: 'Example/Filters',
  component: Filters,
};

const Template = (args) => <Filters {...args} />;

export const Default = Template.bind({});

Default.args = {
  options: FILTER_OPTIONS,
  count:  { POLAND: 11, ITALY: 22, VIETNAM: 33 }
};