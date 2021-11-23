export const SET_LOADING_ACTION = 'SET_LOADING_ACTION';

interface SetLoadingActionPayload {
  readonly loading: boolean;
}

export const setLoadingAction = (payload: SetLoadingActionPayload) => ({
  type: SET_LOADING_ACTION,
  payload,
});

export interface SetLoadingAction {
  readonly type: typeof SET_LOADING_ACTION;
  readonly payload: SetLoadingActionPayload;
}

export type NetworkAction = SetLoadingAction;
