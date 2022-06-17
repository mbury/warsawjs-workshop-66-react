import * as React from 'react';
import SelectMeal from './SelectMeal';
import CompleteOrder from './CompleteOrder';
import { Container } from 'semantic-ui-react';

const OrderFlow = () => {
  const step = 1;

  return (
    <Layout>
      {step === 1 && <SelectMeal />}
      {step === 2 && <CompleteOrder />}
    </Layout>
  );
};
export default OrderFlow;

const Layout = ({ children }) => <Container text>{children}</Container>;
