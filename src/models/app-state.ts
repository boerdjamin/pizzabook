import { Ingridient } from './ingridient';
import { Pizza } from './pizza';
import { User } from './user';

export interface PizzaBookState {
  pizzas: PizzaState;
  users: UserState;
}

export interface PizzaState {
  readonly allPizzas: Pizza[];
  readonly allIngridients: Ingridient[];
}

export interface UserState {
  readonly allUsers: User[];
  readonly loggedInAs: User | undefined;
}
