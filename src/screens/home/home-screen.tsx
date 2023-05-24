import * as React from 'react';

import HomeScreenComponent from './home-component';
import { PizzaBookState } from '../../models/app-state';
import { useSelector } from 'react-redux';

export type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const pizzas = useSelector((state: PizzaBookState) => state.pizzas.allPizzas);
  const currentUser = useSelector(
    (state: PizzaBookState) => state.users.loggedInAs,
  );
  const isLoading = useSelector(
    (state: PizzaBookState) => state.network.isLoading,
  );

  return (
    <HomeScreenComponent
      allPizzas={pizzas}
      currentUser={currentUser}
      isLoading={isLoading}
    />
  );
};

export { HomeScreen };
