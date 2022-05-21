import React, { useState } from "react";
import axios from "axios";
import SitePaths from "../../helpers/path";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

const BodyContent = ({ posts, fetchPosts, isLoading, setIsLoading }) => {
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // add post
  const addPost = () => {
    const data = {
      title: title,
    };

    setIsLoading(true);
    axios
      .post(`${SitePaths.BASE_PATH}/posts/add`, data)
      .then(function (response) {
        fetchPosts();
        clearFromData();
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log("error:", error);
      });
  };
  // update post
  const handleEditClick = (id) => {
    setIsEditing(true);
    setEditId(id);
    const editData = posts?.find((post) => post._id === id)?.title;
    setTitle(editData);
  };
  const updatePost = (postId) => {
    setIsLoading(true);
    const post = posts?.find((post) => post?._id === postId);
    const data = { ...post, title: title };
    axios
      .patch(`${SitePaths.BASE_PATH}/posts/${postId}`, data)
      .then(function (response) {
        fetchPosts();
        clearFromData();
        setIsLoading(false);
        setTitle("");
        setIsEditing(false);
        setEditId(null);
      })
      .catch(function (error) {
        console.log("error:", error);
      });
  };
  const markAsCompleted = (post, e) => {
    const data = { ...post, completed: e.target.checked };
    axios
      .patch(`${SitePaths.BASE_PATH}/posts/${post?._id}`, data)
      .then(function (response) {
        fetchPosts();
      })
      .catch(function (error) {
        console.log("error:", error);
      });
  };

  // delete post
  const deletePost = (postId) => {
    setIsLoading(true);
    axios
      .delete(`${SitePaths.BASE_PATH}/posts/${postId}`)
      .then(function (response) {
        fetchPosts();
      })
      .catch(function (error) {
        console.log("error:", error);
      });
  };

  // clear form data
  const clearFromData = () => {
    setTitle("");
  };

  return (
    <div className="body-content">
      <div className="main-content">
        {/* form */}
        <div className="form-wrap">
          <form className="form" action="javascript:void(0)">
            <div className="form-input">
              <input
                type="text"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What neesd to be done ?"
              />
            </div>
            <div className="action-buttons">
              <button
                className="submit-button"
                disabled={title.length === 0 ? true : false}
                aria-disabled
                onClick={() => {
                  isEditing ? updatePost(editId) : addPost();
                }}
              >
                {isEditing ? "Update Task" : "Add Task"}
              </button>

              {isEditing && (
                <button
                  className="submit-button"
                  aria-disabled
                  onClick={() => {
                    setIsEditing(false);
                    setTitle("");
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* posts */}
        <div className="posts">
          {posts.length > 0 ? (
            <div className="posts-inner">
              {posts?.map((post) => {
                return (
                  <div
                    className={`post-card ${
                      post?.completed ? "completed" : ""
                    }`}
                  >
                    <div className="post-data">
                      <input
                        type="checkbox"
                        className="status-checkbox"
                        checked={post?.completed}
                        onChange={(e) => markAsCompleted(post, e)}
                      />
                      <h3 className="post-title">{post?.title}</h3>
                    </div>
                    <div className="actions">
                      <p
                        className="action-icon"
                        onClick={() => handleEditClick(post?._id)}
                      >
                        <MdModeEditOutline />
                      </p>
                      <p
                        className="action-icon"
                        onClick={() => deletePost(post?._id)}
                      >
                        <MdDelete />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty">
              {!isLoading && posts.length < 0 ? "No Tasks!" : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyContent;
