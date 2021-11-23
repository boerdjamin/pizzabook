import { combineReducers } from 'redux';
import { pizzaReducer } from './pizza-reducer';
import { userReducer } from './user-reducer';

export const rootReducer = combineReducers({
  pizzas: pizzaReducer,
  users: userReducer,
});
