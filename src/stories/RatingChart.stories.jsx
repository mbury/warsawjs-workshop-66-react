import * as React from 'react';
import RatingChart from '../components/RatingChart';
import data from '../../public/data.json';

export default {
  title: 'Example/RatingChart',
  component: RatingChart,
};

const Template = (args) => <RatingChart {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  layout: 'padded',
};

Default.args = {
  data: data.slice(0, 10),
};
