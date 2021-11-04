import {LoginRequestPayload} from '@store/types';

/*Login Account*/
export const LOGIN_ACCOUNT_REQUEST = '@Auth/loginRequest';
export const loginAccountRequest = (payload: LoginRequestPayload) => ({
  type: LOGIN_ACCOUNT_REQUEST,
  payload,
});

export const LOGIN_ACCOUNT_SUCCESS = '@Auth/loginSuccess';
export const loginAccountSuccess = (payload: any) => ({
  type: LOGIN_ACCOUNT_SUCCESS,
  payload,
});

export const LOGIN_ACCOUNT_ERROR = '@Auth/loginError';
export const loginAccountError = () => ({type: LOGIN_ACCOUNT_ERROR});
/*Login Account End*/

/*Logout Account*/
export const LOGOUT_ACCOUNT = '@Auth/logoutRequest';
export const logoutAccount = () => ({type: LOGOUT_ACCOUNT});

export const LOGOUT_ACCOUNT_SUCCESS = '@Auth/logoutSuccess';
export const logoutAccountSuccess = () => ({type: LOGOUT_ACCOUNT_SUCCESS});
/*Logout Account End*/
