import React, { useEffect, useState } from 'react';
import RootNavigation from './src/navigation/root-navigation';
import Airtable from 'airtable';
import { Pizza } from './src/models/pizza';
import { isValidPizza } from './src/utils/pizza-utils';
import { handleError } from './src/utils/error-util';
import { User } from './src/models/user';
import { isValidUser } from './src/utils/user-util';

const base = new Airtable({
  apiKey: process.env.API_KEY || 'keykb1oz1auGVmkhc',
}).base(process.env.APP_ID || 'appLab4MMkQeWEMT7');

export const App = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>();
  const [users, setUsers] = useState<User[]>([]);
  const pizzaBase = base('Pizzas');
  const userBase = base('User');

  useEffect(() => {
    pizzaBase
      .select({
        maxRecords: 50,
        view: 'Grid view',
      })
      .eachPage((records, fetchNextPage) => {
        const allPizzas: Pizza[] = records.reduce<Pizza[]>(
          (pizzaCollection, record) => {
            const newPizza = { id: record.id, ...record.fields };
            const isValid = isValidPizza(newPizza);

            // delete invalid entries
            if (!isValid) {
              pizzaBase.destroy(record.id);
              return pizzaCollection;
            }

            return [...pizzaCollection, newPizza];
          },
          [],
        );

        setPizzas(allPizzas);
        fetchNextPage();
      }, handleError);

    userBase
      .select({
        maxRecords: 3,
        view: 'Grid view',
      })
      .eachPage((records, fetchNextPage) => {
        const allUsers: User[] = records.reduce<User[]>(
          (userCollection, record) => {
            const newUser = { id: record.id, ...record.fields };
            const isValid = isValidUser(newUser);

            // delete invalid entries
            if (!isValid) {
              userBase.destroy(record.id);
              return userCollection;
            }

            return [...userCollection, newUser];
          },
          [],
        );
        setUsers(allUsers);
        fetchNextPage();
      }, handleError);
  }, [pizzaBase, userBase]);

  console.log(pizzas);
  console.log(users);
  return <RootNavigation />;
};
