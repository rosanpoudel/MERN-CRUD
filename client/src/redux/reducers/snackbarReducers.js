import { SnackbarActionTypes } from "../constants/snackbarActionTypes";

const initialState = {
  data: {
    isOpen: false,
    type: "",
    message: "",
  },
};

export const snackbarReducer = (state = initialState, { type, payload }) => {
  if (type === SnackbarActionTypes.SET_SNACKBAR_OPTIONS) {
    return { ...state, data: payload };
  }
  return state;
};
