import { HomeStackParamList, HomeStackRoutes } from '../../navigation';
import { RouteProp, useRoute } from '@react-navigation/native';

import PizzaDetailsScreenComponent from './pizza-details-component';
import React from 'react';

type PizzaDetailsScreenRouteProp = RouteProp<
  HomeStackParamList,
  HomeStackRoutes.Details
>;

type PizzaDetailsScreenProps = {};

const PizzaDetailsScreen: React.FC<PizzaDetailsScreenProps> = () => {
  const route = useRoute<PizzaDetailsScreenRouteProp>();
  const { pizza } = route.params;

  return (
    <PizzaDetailsScreenComponent pizza={pizza} toppings={pizza.toppings} />
  );
};

export { PizzaDetailsScreen };
