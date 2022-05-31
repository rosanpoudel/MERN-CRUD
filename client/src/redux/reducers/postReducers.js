import { PostActionTypes } from "../constants/postActionTypes";

const initialState = {
  posts: [],
  isFetchingPosts: false,
  buttonLoading: false,
};

export const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PostActionTypes.SET_POSTS:
      return { ...state, posts: payload };

    case PostActionTypes.FETCH_POSTS_LOADING:
      return { ...state, isFetchingPosts: payload };

    case PostActionTypes.BUTTON_LOADING:
      return { ...state, buttonLoading: payload };

    default:
      return state;
  }
};
