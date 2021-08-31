import * as React from 'react';
import { pizzaCollection } from '../../../mock/pizza.mock';
import HomeScreenComponent from './home-component';

const HomeScreen = () => {
  return <HomeScreenComponent allPizzas={pizzaCollection} />;
};

export default HomeScreen;
