import { INIT_APP_ACTION } from '../actions/init-app';
import { UserState } from '../../models/app-state';
import { Action } from '../actions';

const initialState: UserState = {
  allUsers: [],
  loggedInAs: undefined,
};

export const userReducer = (
  state: UserState = initialState,
  action: Action,
) => {
  switch (action.type) {
    case INIT_APP_ACTION:
      return { ...action.payload };
    default:
      return state;
  }
};
