import * as React from 'react';
import { Button, Header, Loader, Message, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { useOrderFlow } from './OrderContext';
import { delay } from '../commons/utils';
import MealList from './MealList';

import { getDeliveryCost, getBasketCost } from '../commons/utils';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

const CompleteOrderContainer = () => {
  const { state, reset } = useOrderFlow();
  const ids = state.basket.map((meal) => meal.id).join(',');
  const { isLoading, data = [] } = useQuery(
    ['basket', ids],
    () => axios(`/basket?ids=${ids}`).then(({ data }) => data),
    { refetchOnWindowFocus: false }
  );

  return (
    <CompleteOrder
      basket={data}
      onCancellation={reset}
      onConfirm={() => delay(500)}
      isLoading={isLoading}
    ></CompleteOrder>
  );
};
export default CompleteOrderContainer;

export const CompleteOrder = ({
  basket,
  onCancellation,
  onConfirm,
  isLoading,
}) => {
  const mutation = useMutation(() => onConfirm());

  return (
    <React.Fragment>
      <Header as="h2">Potwierdź zamówienie:</Header>
      {isLoading ? (
        <Loader active inline="centered" />
      ) : (
        <React.Fragment>
          <MealList meals={basket} />
          <PaymentDetails
            basketCost={getBasketCost(basket)}
            deliveryCost={getDeliveryCost(basket)}
          />
          {mutation.isSuccess && <SuccessMessage />}
          {mutation.isError && <ErrorMessage error={mutation.error} />}
          {!mutation.isSuccess && !mutation.isFailure && (
            <CompleteButton
              onClick={() => mutation.mutate()}
              loading={mutation.isLoading}
            />
          )}
          <ResetButton onClick={onCancellation} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

CompleteOrder.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.object),
  onCancellation: PropTypes.func,
  onConfirm: PropTypes.func,
};

CompleteOrder.defaultProps = {
  basket: [],
  onCancellation: undefined,
  onConfirm: undefined,
};

function PaymentDetails(props) {
  return (
    <Table basic="very">
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cena z danie</Table.Cell>
          <Table.Cell collapsing textAlign="right">
            {props.basketCost} zł
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Koszt dostawy</Table.Cell>
          <Table.Cell collapsing textAlign="right">
            +{props.deliveryCost} zł
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <strong>Suma</strong>
          </Table.Cell>
          <Table.Cell collapsing textAlign="right">
            <strong>{props.basketCost + props.deliveryCost} zł</strong>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

const SuccessMessage = () => (
  <Message
    success
    header="Zamówienie zakończyło się sukcesem"
    content="Zapraszamy do skorzystania z naszych usług w przyszłości"
  />
);

const ErrorMessage = ({ error }) => (
  <Message
    error
    header="Zamówienie zakończyło się niepowodzeniem"
    content="Kuchnia nie przyjmuje zamówień"
  />
);

const CompleteButton = ({ loading, onClick }) => (
  <Button loading={loading} onClick={onClick} primary floated="right">
    Zamów
  </Button>
);

const ResetButton = ({ onClick }) => (
  <Button onClick={onClick} floated="left">
    Powrót do menu
  </Button>
);
