import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { RootRoutes, RootStackParamList } from '../../navigation/routes';
import PizzaDetailsScreenComponent from './pizza-details-component';

type PizzaDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  RootRoutes.Details
>;

type PizzaDetailsScreenProps = {};

const PizzaDetailsScreen: React.FC<PizzaDetailsScreenProps> = () => {
  const route = useRoute<PizzaDetailsScreenRouteProp>();
  const pizza = route.params.pizza;

  return (
    <PizzaDetailsScreenComponent pizza={pizza} toppings={pizza.toppings} />
  );
};

export default PizzaDetailsScreen;
