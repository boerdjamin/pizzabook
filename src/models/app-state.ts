import { FoodType } from './food-type';
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
  readonly allFoodTypes: FoodType[];
}

export interface UserState {
  readonly allUsers: User[];
  readonly loggedInAs: User | undefined;
}
