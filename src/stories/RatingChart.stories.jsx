import * as React from 'react';
import RatingChart from '../components/RatingChart';


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
  data:  [{
    rating: 11,
    price: 11,
    reviews: 11,
    name: 'test 1',
  },
  {
    rating: 22,
    price: 22,
    reviews: 22,
    name: 'test 2',
  }],
};