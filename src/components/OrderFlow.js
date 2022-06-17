import React from 'react';
import SelectMeal from './SelectMeal';
import CompleteOrder from './CompleteOrder';
import { OrderFlowProvider } from './OrderContext';
import { Container } from 'semantic-ui-react';

const OrderFlow = () => (
  <Layout>
    <OrderFlowProvider
      productList={<SelectMeal />}
      confirmOrder={<CompleteOrder />}
    ></OrderFlowProvider>
  </Layout>
);
export default OrderFlow;

const Layout = ({ children }) => <Container text>{children}</Container>;
