import { Action, INIT_APP_ACTION } from '../actions';

import { UserState } from '../../models';

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
