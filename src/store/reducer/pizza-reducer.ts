import { INIT_APP_ACTION } from '../actions/init-app';
import { PizzaState } from '../../models/app-state';
import { Action } from '../actions';

export const initialPizzaState: PizzaState = {
  allPizzas: [],
  allIngridients: [],
};

export const pizzaReducer = (
  state: PizzaState = initialPizzaState,
  action: Action,
): PizzaState => {
  switch (action.type) {
    case INIT_APP_ACTION:
      const { pizzas, ingridients } = action.payload;

      return {
        allPizzas: pizzas,
        allIngridients: ingridients,
      };
    default:
      return state;
  }
};
