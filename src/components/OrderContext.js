import React, { useReducer, createContext, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { Message } from 'semantic-ui-react';

const OrderContext = createContext(null);

const initialState = { step: 1, basket: [] };

function init(initialState) {
  return { ...initialState };
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      const { meal } = action.payload;
      const basket = [...state.basket, meal];
      const step = basket.length < 3 ? state.step : 2;
      return { ...state, step, basket };
    case 'RESET':
      return init(initialState);
    default:
      throw new Error();
  }
}
export function useOrderFlow() {
  const context = React.useContext(OrderContext);

  if (!context) {
    throw new Error('useOrderFlow must be used within a OrderFlowProvider');
  }

  const { state, dispatch } = context;

  const addToBasket = useCallback(
    (meal) => dispatch({ type: 'ADD_TO_BASKET', payload: { meal } }),
    [dispatch]
  );

  const reset = useCallback(
    () => dispatch({ type: 'RESET', payload: initialState }),
    [dispatch]
  );

  return { state, addToBasket, reset };
}

export function OrderFlowProvider({ productList, confirmOrder }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const ids = state.basket.map((meal) => meal.id).join(',');
    queryClient.setQueryData(['basket', ids], state.basket);
  }, [queryClient, state.basket]);

  const context = { state, dispatch };
  return (
    <OrderContext.Provider value={context}>
      {state.step === 1 && (
        <div>
          <Message info>
            Aby złożyć zamówienie musisz wybrać jeszcze{' '}
            <b>{3 - state.basket.length} zestawy</b> .
          </Message>
          {productList}
        </div>
      )}
      {state.step === 2 && confirmOrder}
    </OrderContext.Provider>
  );
}
