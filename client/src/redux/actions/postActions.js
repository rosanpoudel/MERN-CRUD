import ApiBase from "../../api";
import { PostActionTypes } from "../constants/postActionTypes";
import { setSnackbarOptions } from "./snackbarActions";

// fetch posts
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostLoading(true));
    const response = await ApiBase.get("/posts");
    dispatch(setPosts(response.data));
    dispatch(fetchPostLoading(false));
  };
};

// fetch loading status
export const fetchPostLoading = (status) => {
  return {
    type: PostActionTypes.FETCH_POSTS_LOADING,
    payload: status,
  };
};

// set posts
export const setPosts = (posts) => {
  return {
    type: PostActionTypes.SET_POSTS,
    payload: posts,
  };
};

// button loading
export const buttonLoading = (status) => {
  return {
    type: PostActionTypes.BUTTON_LOADING,
    payload: status,
  };
};

// add post
export const addPost = (post) => {
  return async (dispatch) => {
    dispatch(buttonLoading(true));
    const response = await ApiBase.post("/posts/add", post);
    dispatch(buttonLoading(false));
    if (response.status === 200) {
      dispatch(
        setSnackbarOptions({
          isOpen: true,
          type: "success",
          message: "Task added successfully !",
        })
      );
      setTimeout(() => {
        dispatch(
          setSnackbarOptions({
            isOpen: false,
            type: "",
            message: "",
          })
        );
      }, 3000);

      // fetch posts
      dispatch(fetchPosts());
    }
  };
};

// update post
export const updatePost = (newPost) => {
  return async (dispatch) => {
    dispatch(buttonLoading(true));
    const response = await ApiBase.patch(`/posts/${newPost?._id}`, newPost);
    dispatch(buttonLoading(false));
    if (response.status === 200) {
      dispatch(
        setSnackbarOptions({
          isOpen: true,
          type: "success",
          message: "Task updated successfully !",
        })
      );
      setTimeout(() => {
        dispatch(
          setSnackbarOptions({
            isOpen: false,
            type: "",
            message: "",
          })
        );
      }, 3000);

      // fetch posts
      dispatch(fetchPosts());
    }
  };
};

// mark completed
export const markCompleted = (newPost) => {
  return async (dispatch) => {
    const response = await ApiBase.patch(`/posts/${newPost?._id}`, newPost);
    if (response.status === 200) {
      dispatch(
        setSnackbarOptions({
          isOpen: true,
          type: "success",
          message: "Task Completed !",
        })
      );
      setTimeout(() => {
        dispatch(
          setSnackbarOptions({
            isOpen: false,
            type: "",
            message: "",
          })
        );
      }, 3000);

      // fetch posts
      dispatch(fetchPosts());
    }
  };
};

// delete post
export const deletePost = (id) => {
  return async (dispatch) => {
    const response = await ApiBase.delete(`/posts/${id}`);
    if (response.status === 200) {
      dispatch(
        setSnackbarOptions({
          isOpen: true,
          type: "success",
          message: "Deleted successfully !",
        })
      );
      setTimeout(() => {
        dispatch(
          setSnackbarOptions({
            isOpen: false,
            type: "",
            message: "",
          })
        );
      }, 3000);
      // fetch posts
      dispatch(fetchPosts());
    }
  };
};
