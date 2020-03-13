import { produce } from 'immer';
import { ActionTypes } from './actions';
import { Action } from './types';

export const initialState = Object.freeze({
  locale: 'en_US',
  userInfo: null,
});

export default (state = initialState, action: Action) =>
  produce(state, draft => {
    switch (action.type) {
      case ActionTypes.SETLOCALE:
        draft.locale = action.locale;
        break;
      case ActionTypes.LOGIN:
        draft.userInfo = action.userInfo;
        break;
      case ActionTypes.LOGOUT:
        draft.userInfo = null;
        break;
    }
  });
