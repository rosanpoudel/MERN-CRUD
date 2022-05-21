import React, { useState } from "react";
import axios from "axios";
import EditIcon from "../../assets/img/edit-icon.png";
import DeleteIcon from "../../assets/img/delete-icon.png";
import SitePaths from "../../helpers/path";

const BodyContent = ({ posts, fetchPosts }) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      {/* form */}
      <div className="form-wrap">
        <div className="form">
          <div className="form-row">
            <label className="label">What needs to be done?</label>
            <input
              type="text"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-row">
            <button
              className="submit"
              disabled={title.length === 0 ? true : false}
              aria-disabled
              onClick={() => {
                isEditing ? updatePost(editId) : addPost();
              }}
            >
              {isLoading ? "Loading..." : isEditing ? "Update" : "Add"}
            </button>
            {isEditing && !isLoading && (
              <button
                className="submit"
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
        </div>
      </div>

      {/* posts */}
      <div className="posts">
        {posts.length > 0 ? (
          <div className="posts-inner">
            {posts?.map((post) => {
              return (
                <div
                  className={`post-card ${post?.completed ? "completed" : ""}`}
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
                      Edit
                    </p>
                    <p
                      className="action-icon"
                      onClick={() => deletePost(post?._id)}
                    >
                      Delete
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty">No Tasks!</div>
        )}
      </div>
    </div>
  );
};

export default BodyContent;
