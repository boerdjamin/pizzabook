import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Airtable from 'airtable';
import { isPizzaFromDBValid } from './src/utils/pizza-utils';
import { isUserFromDBValid } from './src/utils/user-util';
import { fetchDataFromAirtable } from './src/utils/airtable-util';
import { rootReducer } from './src/store/reducer/root-reducer';
import { isIngridientFromDBValid } from './src/utils/ingridient-util';
import {
  AirtableFoodType,
  AirtableIngridient,
  AirtablePizza,
  AirtableUser,
} from './src/models/airtable';
import InitApp from './src/init-app';
import { isFoodTypeFromDBValid } from './src/utils/food-types';

const base = new Airtable({
  apiKey: process.env.API_KEY || 'keykb1oz1auGVmkhc',
}).base(process.env.APP_ID || 'appLab4MMkQeWEMT7');

const store = createStore(rootReducer);

export const App = () => {
  const [fetchedPizzas, setFetchedPizzas] = useState<AirtablePizza[]>([]);
  const [fetchedIngridients, setFetchedIngridients] = useState<
    AirtableIngridient[]
  >([]);
  const [fetchedUsers, setFetchedUsers] = useState<AirtableUser[]>([]);
  const [fetchedFoodTypes, setFetchedFoodTypes] = useState<AirtableFoodType[]>(
    [],
  );

  // TODO: show loader
  useEffect(() => {
    fetchDataFromAirtable<AirtableUser>(
      base('Users'),
      isUserFromDBValid,
      users => {
        setFetchedUsers(users);
      },
    );

    fetchDataFromAirtable<AirtablePizza>(
      base('Pizzas'),
      isPizzaFromDBValid,
      pizzas => {
        setFetchedPizzas(pizzas);
      },
    );

    fetchDataFromAirtable<AirtableIngridient>(
      base('Ingridients'),
      isIngridientFromDBValid,
      ings => {
        setFetchedIngridients(ings);
      },
    );

    fetchDataFromAirtable<AirtableFoodType>(
      base('FoodTypes'),
      isFoodTypeFromDBValid,
      foodType => {
        setFetchedFoodTypes(foodType);
      },
    );
  }, []);

  return (
    <Provider store={store}>
      <InitApp
        rawUsers={fetchedUsers}
        rawPizzas={fetchedPizzas}
        rawIngridients={fetchedIngridients}
        rawFoodTypes={fetchedFoodTypes}
      />
    </Provider>
  );
};
