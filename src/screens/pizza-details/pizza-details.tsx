import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { HomeStackRoutes, HomeStackParamList } from '../../navigation';
import PizzaDetailsScreenComponent from './pizza-details-component';

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

export default PizzaDetailsScreen;
