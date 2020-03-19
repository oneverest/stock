import { produce } from 'immer';
import { ActionTypes } from './actions';

export const initialState = Object.freeze({
  error: {
    level: 'info',
    message: '',
    visible: false,
  },
  pov_list: {
    data: [],
    page: 1,
    pageSize: 20,
    start: null,
    end: null,
  },
});

export default (state = initialState, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case ActionTypes.SHOW_NOTIFICATION:
        draft.error.level = action.level;
        draft.error.message = action.message;
        draft.error.visible = true;
        break;
      case ActionTypes.HIDE_NOTIFICATION:
        draft.error.level = 'info';
        draft.error.message = '';
        draft.error.visible = false;
    }
  });
