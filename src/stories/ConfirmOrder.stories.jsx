import * as React from 'react';
import { CompleteOrder } from '../components/CompleteOrder';
import data from '../../public/data.json';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default {
  title: 'Example/CompleteOrder',
  component: CompleteOrder,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

const Template = (args) => <CompleteOrder {...args} />;

export const Default = Template.bind({});

Default.args = {
  basket: [data[0]],
  paymentMethod: 'Blik',
};
