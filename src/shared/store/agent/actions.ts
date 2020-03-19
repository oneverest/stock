import { add as addPov, update as updatePov } from 'services/pov';

export const ActionTypes = {
  SHOW_NOTIFICATION: 'agent/show_notification',
  HIDE_NOTIFICATION: 'agent/hide_notification',
};

type NotificationLevel = 'info' | 'warning' | 'error' | 'success';

const showNotification = (level: NotificationLevel, message: string) => {
  type: ActionTypes.SHOW_NOTIFICATION, level, message;
};

const hideNotification = () => {
  type: ActionTypes.HIDE_NOTIFICATION;
};

export const addPovRecord = (data: any) => {
  return async (dispatch: any) => {
    const result = await addPov(data);
    if (result.isFailure) {
      return dispatch(showNotification('error', String(result.errorValue())));
    }

    return dispatch(showNotification('success', '提交成功'));
  };
};

export const updatePovRecord = (id: string, data: any) => {
  return async (dispatch: any) => {
    const result = await updatePov(id, data);
    if (result.isFailure) {
      return dispatch(showNotification('error', String(result.errorValue())));
    }

    return dispatch(showNotification('success', '更新成功'));
  };
};
