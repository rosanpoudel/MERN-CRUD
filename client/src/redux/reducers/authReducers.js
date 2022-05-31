import AuthActionTypes from "../constants/authActionTypes";

const initialState = {
  isLoggedIn: false,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AuthActionTypes.SET_LOGIN_STATUS:
      return { ...state, isLoggedIn: payload };

    default:
      return state;
  }
};
