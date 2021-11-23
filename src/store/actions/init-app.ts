import { PizzaState, UserState } from './../../models/app-state';

export const INIT_APP_ACTION = 'INIT_APP_ACTION';

type InitAppActionPayload = UserState & PizzaState;

export const initAppAction = (payload: InitAppActionPayload) => ({
  type: INIT_APP_ACTION,
  payload,
});

export interface InitAppAction {
  readonly type: typeof INIT_APP_ACTION;
  readonly payload: InitAppActionPayload;
}
