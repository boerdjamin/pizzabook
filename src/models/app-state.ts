import { IIngridient } from './ingridient';
import { IPizza } from './pizza';
import { IUser } from './user';

export interface PizzaBookState {
  pizzas: PizzaState;
  users: UserState;
}

export interface PizzaState {
  readonly allPizzas: IPizza[];
  readonly allIngridients: IIngridient[];
}

export interface UserState {
  readonly allUsers: IUser[];
  readonly loggedInAs: IUser | undefined;
}
