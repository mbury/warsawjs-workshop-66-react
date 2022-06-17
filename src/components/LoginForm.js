import * as React from 'react';
import {
  Form,
  Button,
  Header,
  Message,
  Segment,
  Container,
} from 'semantic-ui-react';
import { GlobalStateContext } from '../commons/globalState';

import { useActor } from '@xstate/react';

const LoginForm = () => {
  const globalServices = React.useContext(GlobalStateContext);

  const [state, send] = useActor(globalServices.authService);

  const performLogin = (payload) => send({ type: 'LOGIN', ...payload });
  const error = state.context.message;
  const toManyTries = state.matches('toManyTries');

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Container text>
      <br />
      <Segment textAlign="center" stacked>
        <Header>Zaloguj się</Header>

        {toManyTries && (
          <Message warning>
            Możliwość logowania została zablokowana na 5 sekund z powodu zbyt
            wielu prób!
          </Message>
        )}
        {error && <Message error>{error}</Message>}
        <Form onSubmit={() => performLogin({ login, password })} size="large">
          <Segment stacked>
            <Form.Input
              name="login"
              onChange={(e, { value }) => setLogin(value)}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="login"
            />
            <Form.Input
              onChange={(e, { value }) => setPassword(value)}
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="hasło"
              type="password"
            />
            <Button
              loading={state.matches('authenticating')}
              color="teal"
              fluid
              size="large"
            >
              Zaloguj
            </Button>
          </Segment>
        </Form>
        <Message>
          login: <strong>dowolny</strong>
          <br /> hasło: <strong>admin</strong>
        </Message>
      </Segment>
    </Container>
  );
};

export default LoginForm;
