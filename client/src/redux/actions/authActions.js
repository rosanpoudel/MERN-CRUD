import AuthActionTypes from "../constants/authActionTypes";

export const setLoginStatus = (status) => {
  return {
    type: AuthActionTypes.SET_LOGIN_STATUS,
    payload: status,
  };
};
