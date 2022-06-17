import React from 'react';
import OrderFlow from './OrderFlow';
import { GlobalStateContext } from '../commons/globalState';
import { useActor } from '@xstate/react';
import LoginForm from './LoginForm';

const PageContent = () => {
  const globalServices = React.useContext(GlobalStateContext);
  const [state] = useActor(globalServices.authService);

  return (
    <div>{!state.matches('loggedIn') ? <LoginForm /> : <OrderFlow />}</div>
  );
};
export default PageContent;
