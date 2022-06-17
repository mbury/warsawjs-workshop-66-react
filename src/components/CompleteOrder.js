import * as React from 'react';
import { Button, Header, Loader, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import MealList from './MealList';

import { getBasketCost, getDeliveryCost } from '../commons/utils';

const CompleteOrderContainer = () => {
  return <CompleteOrder></CompleteOrder>;
};
export default CompleteOrderContainer;

export const CompleteOrder = ({
  basket,
  paymentMethod,
  onCancellation,
  onConfirm,
  isLoading,
}) => {
  return (
    <React.Fragment>
      <Header as="h2">Potwierdź zamówienie:</Header>
      {isLoading ? (
        <Loader active inline="centered" />
      ) : (
        <React.Fragment>
          <MealList meals={basket} />
          <PaymentDetails
            paymentMethod={paymentMethod}
            basketCost={getBasketCost(basket)}
            deliveryCost={getDeliveryCost(basket)}
          />
          <CompleteButton onClick={() => onConfirm} />
          <ResetButton onClick={onCancellation} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

CompleteOrder.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.object),
  paymentMethod: PropTypes.string,
  onCancellation: PropTypes.func,
  onConfirm: PropTypes.func,
  isLoading: PropTypes.bool,
};

CompleteOrder.defaultProps = {
  basket: [],
  paymentMethod: undefined,
  onCancellation: undefined,
  onConfirm: undefined,
  isLoading: false,
};

function PaymentDetails(props) {
  return (
    <Table basic="very">
      <Table.Body>
        <Table.Row>
          <Table.Cell>Forma płatności</Table.Cell>
          <Table.Cell collapsing textAlign="right">
            {props.paymentMethod}
          </Table.Cell>
        </Table.Row>
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

// const SuccessMessage = () => (
//   <Message
//     success
//     header="Zamówienie zakończyło się sukcesem"
//     content="Zapraszamy do skorzystania z naszych usług w przyszłości"
//   />
// );

// const ErrorMessage = ({ error }) => (
//   <Message
//     error
//     header="Zamówienie zakończyło się niepowodzeniem"
//     content="Kuchnia nie przyjmuje zamówień"
//   />
// );

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
