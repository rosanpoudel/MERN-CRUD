import { combineReducers } from "redux";
import { authReducer } from "./authReducers";
import { postReducer } from "./postReducers";
import { snackbarReducer } from "./snackbarReducers";

const reducers = combineReducers({
  allPosts: postReducer,
  auth: authReducer,
  snackbar: snackbarReducer,
});

export default reducers;
