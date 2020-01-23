import React, { PropsWithChildren, useReducer, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

export interface IClient {
  user_id: string;
  bearer: string;
}

type TClientAction = {
  type: 'UPDATE' | 'CLEAR';
  payload: IClient;
};

type TClientDispatch = (state: IClient, action: TClientAction) => IClient;

export const ClientStateContext = React.createContext<IClient>({
  user_id: '',
  bearer: '',
});
export const ClientDispatchContext = React.createContext<
  React.Dispatch<TClientAction>
>(null);

const reducer: TClientDispatch = (
  state: IClient,
  action: { type: string; payload: IClient },
) => {
  switch (action.type) {
    case 'UPDATE':
      return action.payload;
    case 'CLEAR':
      return { user_id: '', bearer: '' };
    default:
      throw new Error('Undefined Error');
  }
};

export const ClientProvider: React.FC = (props: PropsWithChildren<{}>) => {
  const { pathname } = useRouter();
  const [userData, userDispatch] = useReducer(reducer, {
    user_id: '',
    bearer: '',
  });

  useEffect(() => {
    const fetchData: IClient = JSON.parse(localStorage.getItem('BEMS_user'));
    if (null === fetchData) {
      Router.push('/login');
    } else {
      userDispatch({
        type: 'UPDATE',
        payload: fetchData,
      });
      Router.push(pathname);
    }
  }, []);

  return (
    <ClientDispatchContext.Provider value={userDispatch}>
      <ClientStateContext.Provider value={userData}>
        {props.children}
      </ClientStateContext.Provider>
    </ClientDispatchContext.Provider>
  );
};
