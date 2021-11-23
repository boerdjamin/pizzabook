import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootNavigation from './src/navigation/root-navigation';
import Airtable from 'airtable';
import { IPizza, Pizza } from './src/models/pizza';
import { isPizzaFromDBValid } from './src/utils/pizza-utils';
import { handleError } from './src/utils/error-util';
import { IUser, User } from './src/models/user';
import { isUserFromDBValid } from './src/utils/user-util';
import { rootReducer } from './src/store/reducer/root-reducer';

const base = new Airtable({
  apiKey: process.env.API_KEY || 'keykb1oz1auGVmkhc',
}).base(process.env.APP_ID || 'appLab4MMkQeWEMT7');

const store = createStore(rootReducer);

export const App = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    base('Pizzas')
      .select({
        maxRecords: 50,
        view: 'Grid view',
      })
      .eachPage((records, fetchNextPage) => {
        const allPizzas = records.reduce<IPizza[]>(
          (pizzaCollection, record) => {
            const newPizza = record.fields;
            const isValid = isPizzaFromDBValid(newPizza);

            // delete invalid entries
            if (!isValid) {
              base('Pizzas').destroy(record.id);
              return pizzaCollection;
            }

            return [...pizzaCollection, { id: record.id, ...newPizza }];
          },
          [],
        );

        setPizzas(allPizzas);
        fetchNextPage();
      }, handleError);

    base('Users')
      .select({
        maxRecords: 3,
        view: 'Grid view',
      })
      .eachPage((records, fetchNextPage) => {
        const storedUsers = records.reduce<IUser[]>(
          (userCollection, record) => {
            const rawUser = record.fields;
            const isValid = isUserFromDBValid(rawUser);

            // delete invalid entries
            if (!isValid) {
              base('Users').destroy(record.id);
              return userCollection;
            }

            return [...userCollection, { id: record.id, ...rawUser }];
          },
          [],
        );
        setUsers(storedUsers);
        fetchNextPage();
      }, handleError);
  }, []);

  return (
    <Provider store={store}>
      <RootNavigation
        allUsers={users}
        allPizzas={pizzas}
        allIngridients={[]}
        loggedInAs={undefined}
      />
    </Provider>
  );
};
