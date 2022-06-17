import * as React from 'react';
import MealList from '../components/MealList';
import data from '../../public/data.json';

export default {
  title: 'Example/MealList',
  component: MealList,
};

const Template = (args) => <MealList {...args} />;

export const AllowSelectMeal = Template.bind({});

AllowSelectMeal.args = {
  meals: data.slice(0, 3),
};

AllowSelectMeal.parameters = {
  layout: 'centered',
};

export const ReadOnly = Template.bind({});

ReadOnly.args = {
  meals: data.slice(0, 3),
  onSelect: undefined,
};

ReadOnly.parameters = {
  layout: 'centered',
};
