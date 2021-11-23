import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Airtable from 'airtable';
import { rootReducer } from './src/store/reducer/root-reducer';
import InitApp from './src/init-app';

export const App = () => {
  const base = new Airtable({
    apiKey: process.env.API_KEY || 'keykb1oz1auGVmkhc',
  }).base(process.env.APP_ID || 'appLab4MMkQeWEMT7');

  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <InitApp database={base} />
    </Provider>
  );
};
