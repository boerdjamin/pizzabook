import * as React from 'react';
import { useSelector } from 'react-redux';
import { PizzaBookState } from '../../models/app-state';
import HomeScreenComponent from './home-component';

export type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const pizzas = useSelector((state: PizzaBookState) => state.pizzas.allPizzas);
  const currentUser = useSelector(
    (state: PizzaBookState) => state.users.loggedInAs,
  );

  return <HomeScreenComponent allPizzas={pizzas} currentUser={currentUser} />;
};

export default HomeScreen;
