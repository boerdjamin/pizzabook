import { Action } from '../actions';
import { SET_LOADING_ACTION } from '../actions';
import { NetworkState } from '../../models/app-state';

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
    default:
      return state;
  }
};
