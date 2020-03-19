import { add as addPov, update as updatePov, getAllPovs } from 'services/pov';

export const ActionTypes = {
  SHOW_NOTIFICATION: 'agent/show_notification',
  HIDE_NOTIFICATION: 'agent/hide_notification',
  FETCH_POV_LIST: 'agent/fetch_pov_list',
};

type NotificationLevel = 'info' | 'warning' | 'error' | 'success';

export const showNotification = (level: NotificationLevel, message: string) => {
  return {
    type: ActionTypes.SHOW_NOTIFICATION,
    level,
    message,
  };
};

export const hideNotification = () => {
  return {
    type: ActionTypes.HIDE_NOTIFICATION,
  };
};

const fetchPovList = (data: any[], meta: any) => {
  return {
    type: ActionTypes.FETCH_POV_LIST,
    data,
    meta,
  };
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

export const getAllPovsAction = (options: { start?: string; end?: string; page: number; pageSize?: number }) => {
  return async (dispatch: any, getState: any) => {
    const result = await getAllPovs(options);
    if (result.isFailure) {
      return dispatch(showNotification('error', String(result.errorValue())));
    }

    const data: any = result.getValue();
    const state = getState();
    console.log('getAllPovsAction:', data, state);

    if (state.agent.pov_list.total !== Number(data.meta.count)) {
      return dispatch(fetchPovList(data.data, data.meta));
    }

    return;
  };
};
