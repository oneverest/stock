export const ActionTypes = {
  SEND_HC_MESSAGE: 'hc/send_message',
  CLEAR_HC_MESSAGE: 'hc/clear_message',
};

export const sendHcMessageAction = (message: string, error = false) => {
  return {
    type: ActionTypes.SEND_HC_MESSAGE,
    message,
    error,
  };
};

export const clearHcMessageAction = () => {
  return {
    type: ActionTypes.CLEAR_HC_MESSAGE,
  };
};
