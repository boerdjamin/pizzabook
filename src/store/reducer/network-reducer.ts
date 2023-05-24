import { Action, SET_LOADING_ACTION } from '../actions';

import { INIT_APP_ACTION } from './../actions/init-app';
import { NetworkState } from '../../models';

export const initialNetworkState: NetworkState = {
  isLoading: false,
};

export const networkReducer = (
  state: NetworkState = initialNetworkState,
  action: Action,
): NetworkState => {
  switch (action.type) {
    case SET_LOADING_ACTION:
      const { loading } = action.payload;
      return {
        isLoading: loading,
      };

    case INIT_APP_ACTION:
      return { isLoading: false };
    default:
      return state;
  }
};
