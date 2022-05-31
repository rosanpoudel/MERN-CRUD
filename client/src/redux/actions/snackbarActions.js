import { SnackbarActionTypes } from "../constants/snackbarActionTypes";

export const setSnackbarOptions = (snackbarData) => {
  return {
    type: SnackbarActionTypes.SET_SNACKBAR_OPTIONS,
    payload: snackbarData,
  };
};
