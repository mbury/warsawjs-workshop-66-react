import * as React from 'react';

import { useActor } from '@xstate/react';
import {
  Button,
  Container,
  Header,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import { GlobalStateContext } from '../commons/globalState';

const NavBar = () => {
  const globalServices = React.useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.authService);
  const logout = () => send('LOGOUT');
  const { login } = state.context;

  const [fixed, setFixed] = React.useState(false);
  const hideFixedMenu = () => setFixed(false);
  const showFixedMenu = () => setFixed(true);

  return (
    <Visibility
      once={false}
      onBottomPassed={showFixedMenu}
      onBottomPassedReverse={hideFixedMenu}
    >
      <Segment
        inverted
        textAlign="center"
        style={{
          minHeight: 200,
          padding: '0.5em 0em',
          marginBottom: '2em',
        }}
        vertical
      >
        <Menu
          fixed={fixed ? 'top' : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="large"
        >
          <Container>
            <Menu.Item active>ORDERit</Menu.Item>
            <Menu.Item position="right">
              {state.matches('loggedIn') && (
                <>
                  Witaj, {login}
                  <Button
                    as="a"
                    onClick={logout}
                    inverted={!fixed}
                    primary={fixed}
                    style={{
                      marginLeft: '0.5em',
                    }}
                  >
                    Wyloguj
                  </Button>
                </>
              )}
            </Menu.Item>
          </Container>
        </Menu>
        <HomepageHeading />
      </Segment>
    </Visibility>
  );
};

export default NavBar;

const HomepageHeading = () => (
  <Container>
    <Header
      as="h1"
      inverted
      style={{
        fontSize: '3em',
        fontWeight: 'normal',
        marginBottom: '0.5em',
        marginTop: '0.5em',
      }}
    >
      Zamów TERAZ i jedz PYSZNIE
      <Header.Subheader>
        Wyszukiwarka Twoich ulubionych potrwa. Blisko Ciebie. W najlepszych
        cenach.
      </Header.Subheader>
    </Header>
  </Container>
);
