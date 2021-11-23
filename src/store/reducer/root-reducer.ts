import { combineReducers } from 'redux';
import { initialPizzaState, pizzaReducer } from './pizza-reducer';
import { initialUserState, userReducer } from './user-reducer';

export const initialAppState = {
  pizzas: initialPizzaState,
  users: initialUserState,
};

export const rootReducer = combineReducers({
  pizzas: pizzaReducer,
  users: userReducer,
});
