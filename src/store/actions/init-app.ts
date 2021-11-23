import { FoodType } from './../../models/food-type';
import { Ingridient } from '../../models/ingridient';
import { Pizza } from '../../models/pizza';
import { User } from '../../models/user';

export const INIT_APP_ACTION = 'INIT_APP_ACTION';

export interface InitialAppData {
  readonly pizzas: Pizza[];
  readonly ingridients: Ingridient[];
  readonly users: User[];
  readonly foodTypes: FoodType[];
}

type InitAppActionPayload = InitialAppData;

export const initAppAction = (payload: InitAppActionPayload) => ({
  type: INIT_APP_ACTION,
  payload,
});

export interface InitAppAction {
  readonly type: typeof INIT_APP_ACTION;
  readonly payload: InitAppActionPayload;
}
