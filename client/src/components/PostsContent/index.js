import React, { useEffect, useState } from "react";
import axios from "axios";
import SitePaths from "../../helpers/path";
import { MdModeEditOutline, MdDelete, MdPendingActions } from "react-icons/md";
import Button from "../Button";
import { getCookie } from "../../helpers/localStorage";
import headers from "../../helpers/requestHeaders";

const PostsContent = ({ isLoading, setIsLoading }) => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [tempPosts, setTempPosts] = useState([]);

  const author = JSON.parse(localStorage.getItem("user")).result?.name;
  const authorId = JSON.parse(localStorage.getItem("user")).result?._id;

  // fetch posts
  const fetchPosts = async () => {
    setIsLoading(true);
    axios
      .get(`${SitePaths.BASE_PATH}/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      })
      .then((resp) => {
        setPosts(resp.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("error:", err);
      });
  };

  // add post
  const addPost = async () => {
    const data = {
      title: title,
      author: author,
      authorId: authorId,
    };
    setIsLoading(true);
    axios
      .post(`${SitePaths.BASE_PATH}/posts/add`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      })
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
  const updatePost = async (postId) => {
    setIsLoading(true);
    const post = posts?.find((post) => post?._id === postId);
    const data = { ...post, title: title };
    axios
      .patch(`${SitePaths.BASE_PATH}/posts/${postId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      })
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
  const markAsCompleted = async (post, e) => {
    setIsLoading(true);
    const data = { ...post, completed: e.target.checked };
    axios
      .patch(`${SitePaths.BASE_PATH}/posts/${post?._id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      })
      .then(function (response) {
        fetchPosts();
      })
      .catch(function (error) {
        console.log("error:", error);
      });
  };

  // delete post
  const deletePost = async (postId) => {
    setIsLoading(true);
    axios
      .delete(`${SitePaths.BASE_PATH}/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      })
      .then(function (response) {
        fetchPosts();
      })
      .catch(function (error) {
        console.log("error:", error);
      });
  };

  // handle filter
  const handleFilter = (filterValue) => {
    setActiveFilter(filterValue);
    if (filterValue === "all") {
      setTempPosts(posts);
    } else if (filterValue === "completed") {
      setTempPosts(posts?.filter((post) => post.completed));
    } else {
      setTempPosts(posts?.filter((post) => !post.completed));
    }
  };

  // clear form data
  const clearFromData = () => {
    setTitle("");
  };

  useEffect(() => {
    setTempPosts(posts);
    handleFilter(activeFilter);
  }, [posts || activeFilter]);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="posts-wrapper">
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
              {/* actions */}
              <div className="actions">
                <Button
                  disabled={title.length === 0 ? true : false}
                  label={isEditing ? "Update Task" : "Add Task"}
                  onClick={() => {
                    isEditing ? updatePost(editId) : addPost();
                  }}
                />

                {isEditing && (
                  <Button
                    label="Cancel"
                    onClick={() => {
                      setIsEditing(false);
                      setTitle("");
                    }}
                  />
                )}
              </div>

              {/* filters */}
              <div className="filters">
                <div className="parameters">
                  <p
                    className={activeFilter === "all" ? "active" : null}
                    onClick={() => handleFilter("all")}
                  >
                    All
                  </p>
                  <p
                    className={activeFilter === "completed" ? "active" : null}
                    onClick={() => handleFilter("completed")}
                  >
                    Completed
                  </p>
                  <p
                    className={activeFilter === "pending" ? "active" : null}
                    onClick={() => handleFilter("pending")}
                  >
                    pending
                  </p>
                </div>
                <div className="count">
                  <MdPendingActions />
                  <span>{tempPosts?.length}</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* posts */}
        <div className="posts">
          {tempPosts?.length > 0 ? (
            <div className="posts-inner">
              {tempPosts?.map((post) => {
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
            <div className="empty-state">
              {!isLoading && tempPosts?.length === 0 ? "No Tasks!" : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsContent;
