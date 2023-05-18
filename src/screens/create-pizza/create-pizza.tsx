import CreatePizzaComponent from './create-pizza-component';
import { PizzaBookState } from '../../models';
import React from 'react';
import { useSelector } from 'react-redux';

type CreatePizzaScreenProps = {};

const CreatePizzaScreen: React.FC<CreatePizzaScreenProps> = () => {
  const { allIngridients } = useSelector(
    (state: PizzaBookState) => state.pizzas,
  );

  return <CreatePizzaComponent ingridients={allIngridients} />;
};

export { CreatePizzaScreen };
