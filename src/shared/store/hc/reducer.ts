import { produce } from 'immer';
import { ActionTypes } from './actions';

const initialState = Object.freeze({
  messagebar: {
    error: false,
    visible: false,
    message: '',
  },
});

export default (state = initialState, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case ActionTypes.SEND_HC_MESSAGE:
        draft.messagebar.error = action.error;
        draft.messagebar.message = action.message;
        draft.messagebar.visible = true;
        break;
      case ActionTypes.CLEAR_HC_MESSAGE:
        draft.messagebar.error = false;
        draft.messagebar.visible = false;
        draft.messagebar.message = '';
        break;
    }
  });
