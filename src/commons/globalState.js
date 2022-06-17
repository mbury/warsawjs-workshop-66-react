import * as React from 'react';
import { useInterpret } from '@xstate/react';
import { assign, createMachine } from 'xstate';
import { delay } from './utils';

const authMachine = createMachine(
  {
    initial: 'loggedOut',
    context: {
      login: '',
      retries: 0,
      maxTries: 3,
    },
    states: {
      loggedIn: {
        on: {
          LOGOUT: 'loggedOut',
        },
      },
      loggedOut: {
        on: {
          LOGIN: {
            target: 'authenticating',
          },
        },
        always: { target: 'toManyTries', cond: 'canRetry' },
      },
      authenticating: {
        invoke: {
          src: 'performLogin',
          onDone: { target: 'loggedIn', actions: 'onSuccess' },
          onError: { target: 'loggedOut', actions: 'onError' },
        },
      },
      toManyTries: {
        after: {
          5000: { target: 'loggedOut', actions: 'resetTries' },
        },
      },
    },
  },
  {
    services: {
      performLogin: async (ctx, event) => {
        const { type, ...payload } = event;
        await delay(500);
        if (payload.password === 'admin') {
          return await Promise.resolve(payload);
        } else {
          return await Promise.reject('Nieprawidłowe hasło');
        }
      },
    },
    actions: {
      onSuccess: assign((ctx, event) => ({
        login: event.data.login,
        retries: 0,
        message: undefined,
      })),
      resetTries: assign((ctx, event) => ({
        retries: 0,
        message: undefined,
      })),
      onError: assign((ctx, event) => {
        return {
          retries: ctx.retries + 1,
          message: event.data,
        };
      }),
    },
    guards: {
      canRetry: ({ retries, maxTries }) => retries === maxTries,
    },
  }
);

export const GlobalStateContext = React.createContext({});

export const GlobalStateProvider = (props) => {
  const authService = useInterpret(authMachine);

  return (
    <GlobalStateContext.Provider value={{ authService }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
