import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { base } from './airtable';
import { rootReducer } from './src/store/reducer/root-reducer';
import InitApp from './src/init-app';

export const App = () => {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <InitApp database={base} />
    </Provider>
  );
};
