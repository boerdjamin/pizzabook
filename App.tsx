import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootNavigation from './src/navigation/root-navigation';
import Airtable from 'airtable';
import { IPizza } from './src/models/pizza';
import { isPizzaFromDBValid } from './src/utils/pizza-utils';
import { IUser } from './src/models/user';
import { isUserFromDBValid } from './src/utils/user-util';
import { fetchDataFromAirtable } from './src/utils/airtable-util';
import { rootReducer } from './src/store/reducer/root-reducer';
import { isIngridientFromDBValid } from './src/utils/ingridient-util';
import { IIngridient } from './src/models/ingridient';

const base = new Airtable({
  apiKey: process.env.API_KEY || 'keykb1oz1auGVmkhc',
}).base(process.env.APP_ID || 'appLab4MMkQeWEMT7');

const store = createStore(rootReducer);

export const App = () => {
  const [fetchedPizzas, setFetchedPizzas] = useState<IPizza[]>([]);
  const [fetchedIngridients, setFetchedIngridients] = useState<IIngridient[]>(
    [],
  );
  const [fetchedUsers, setFetchedUsers] = useState<IUser[]>([]);

  // fetch databases
  useEffect(() => {
    fetchDataFromAirtable<IUser>(base('Users'), isUserFromDBValid, users =>
      setFetchedUsers(users),
    );

    fetchDataFromAirtable<IPizza>(base('Pizzas'), isPizzaFromDBValid, pizzas =>
      setFetchedPizzas(pizzas),
    );

    fetchDataFromAirtable<IIngridient>(
      base('Ingridients'),
      isIngridientFromDBValid,
      ings => setFetchedIngridients(ings),
    );
  }, []);

  return (
    <Provider store={store}>
      <RootNavigation
        allUsers={fetchedUsers}
        allPizzas={fetchedPizzas}
        allIngridients={fetchedIngridients}
        loggedInAs={undefined}
      />
    </Provider>
  );
};
