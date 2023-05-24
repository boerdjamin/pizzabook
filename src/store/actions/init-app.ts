import { FoodType, Ingridient, Pizza, Recipe, User } from '../../models';

export const INIT_APP_ACTION = 'INIT_APP_ACTION';

export interface InitialAppData {
  readonly pizzas: Pizza[];
  readonly ingridients: Ingridient[];
  readonly recipes: Recipe[];
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
