import React from 'react';
import { useSelector } from 'react-redux';
import { PizzaBookState } from '../../models/app-state';
import CreatePizzaComponent from './create-pizza-component';

type CreatePizzaScreenProps = {};

const CreatePizzaScreen: React.FC<CreatePizzaScreenProps> = () => {
  const { allFoodTypes, allIngridients } = useSelector(
    (state: PizzaBookState) => state.pizzas,
  );

  return (
    <CreatePizzaComponent
      ingridients={allIngridients}
      foodTypes={allFoodTypes}
    />
  );
};

export default CreatePizzaScreen;
