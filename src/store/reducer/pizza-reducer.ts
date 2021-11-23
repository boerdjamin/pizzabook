import { INIT_APP_ACTION } from '../actions/init-app';
import { PizzaState } from '../../models/app-state';
import { Action } from '../actions';

const initialState: PizzaState = {
  allPizzas: [],
  allIngridients: [],
};

export const pizzaReducer = (
  state: PizzaState = initialState,
  action: Action,
) => {
  switch (action.type) {
    case INIT_APP_ACTION:
      return { ...action.payload };
    default:
      return state;
  }
};
