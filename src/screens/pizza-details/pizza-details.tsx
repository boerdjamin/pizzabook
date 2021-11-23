import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IIngridient } from '../../models/ingridient';
import { RootRoutes, RootStackParamList } from '../../navigation/routes';
import PizzaDetailsScreenComponent from './pizza-details-component';
import { PizzaBookState } from '../../models/app-state';

type PizzaDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  RootRoutes.Details
>;

type PizzaDetailsScreenProps = {};

const PizzaDetailsScreen: React.FC<PizzaDetailsScreenProps> = () => {
  const route = useRoute<PizzaDetailsScreenRouteProp>();
  const pizza = route.params.pizza;
  const [toppings, setToppings] = useState<IIngridient[]>([]);
  const allIngridients = useSelector(
    (state: PizzaBookState) => state.pizzas.allIngridients,
  );

  useEffect(() => {
    pizza.toppingIds.forEach(id => {
      const ingridient = allIngridients.find(ing => ing.id === id);
      if (ingridient) {
        setToppings([...toppings, ingridient]);
      }
    });
  }, [pizza.toppingIds, allIngridients, toppings]);

  return <PizzaDetailsScreenComponent pizza={pizza} toppings={toppings} />;
};

export default PizzaDetailsScreen;
