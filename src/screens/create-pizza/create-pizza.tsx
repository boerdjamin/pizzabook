import React from 'react';
import { useSelector } from 'react-redux';
import { PizzaBookState } from '../../models';
import CreatePizzaComponent from './create-pizza-component';

type CreatePizzaScreenProps = {};

const CreatePizzaScreen: React.FC<CreatePizzaScreenProps> = () => {
  const { allIngridients } = useSelector(
    (state: PizzaBookState) => state.pizzas,
  );

  return <CreatePizzaComponent ingridients={allIngridients} />;
};

export default CreatePizzaScreen;
