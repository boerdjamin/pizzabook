import { INIT_APP_ACTION } from '../actions/init-app';
import { UserState } from '../../models/app-state';
import { Action } from '../actions';

export const initialUserState: UserState = {
  allUsers: [],
  loggedInAs: undefined,
};

export const userReducer = (
  state: UserState = initialUserState,
  action: Action,
): UserState => {
  switch (action.type) {
    case INIT_APP_ACTION:
      return { ...state, ...action.payload.users };
    default:
      return state;
  }
};
