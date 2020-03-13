import { Locale } from './types';
import makeActionCreator from 'store/makeActionCreator';
import { login_request, check_login_request, logout_request } from 'services';
import { sendHcMessageAction } from 'store/hc/actions';

export const ActionTypes = {
  SETLOCALE: 'app/set-locale',
  LOGIN: 'app/login',
  LOGOUT: 'app/logout',
  CHECK_LOGIN: 'app/check-login',
};

interface ActionLoginPayload {
  userInfo: any;
}

interface ActionSetLocalePayload {
  locale: Locale;
}

// export const setLocale = (locale: Locale) => ({
//   type: ActionTypes.SETLOCALE,
//   payload: locale,
// });

const loginActionCreator = makeActionCreator<ActionLoginPayload>(ActionTypes.LOGIN);
const logoutActionCreator = makeActionCreator<any>(ActionTypes.LOGOUT);

export const setLocaleActionCreator = makeActionCreator<ActionSetLocalePayload>(ActionTypes.SETLOCALE);
export const loginAction = (email: string, password: string) => {
  return async (dispatch: any) => {
    const result = await login_request(email, password);
    if (result.isSuccess) {
      dispatch(
        loginActionCreator({
          userInfo: result.getValue(),
        }),
      );
    } else {
      dispatch(sendHcMessageAction(String(result.errorValue()), true));
    }
  };
};

export const logoutAction = () => {
  return async (dispatch: any) => {
    const result = await logout_request();
    if (result.isFailure) {
      return;
    }
    return dispatch(logoutActionCreator());
  };
};

export const checkLoginAction = () => {
  return async (dispatch: any) => {
    const result = await check_login_request();
    console.log(result);
    if (result.isFailure) {
      return dispatch({
        type: ActionTypes.LOGOUT,
      });
    }
    dispatch(
      loginActionCreator({
        userInfo: result.getValue(),
      }),
    );
  };
};
