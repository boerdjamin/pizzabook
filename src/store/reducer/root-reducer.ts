import { PizzaBookState } from './../../models/app-state';
import { initialNetworkState, networkReducer } from './network-reducer';
import { combineReducers } from 'redux';
import { initialPizzaState, pizzaReducer } from './pizza-reducer';
import { initialUserState, userReducer } from './user-reducer';

export const initialAppState: PizzaBookState = {
  pizzas: initialPizzaState,
  users: initialUserState,
  network: initialNetworkState,
};

export const rootReducer = combineReducers<PizzaBookState>({
  pizzas: pizzaReducer,
  users: userReducer,
  network: networkReducer,
});
