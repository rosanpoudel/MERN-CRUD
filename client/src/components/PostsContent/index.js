import React, { useEffect, useState } from "react";
import { MdModeEditOutline, MdDelete, MdPendingActions } from "react-icons/md";
import Button from "../Button";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchPostLoading,
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
  markCompleted,
} from "../../redux/actions/postActions";

const PostsContent = ({ isLoggedIn }) => {
  const dispatch = useDispatch();
  const { posts, isFetchingPosts, buttonLoading } = useSelector(
    (state) => state.allPosts
  );

  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [tempPosts, setTempPosts] = useState([]);
  const author = JSON.parse(localStorage.getItem("user"))?.result?.name;
  const authorId = JSON.parse(localStorage.getItem("user"))?.result?._id;

  // add post
  const addPostClick = async () => {
    const data = {
      title: title,
      author: author,
      authorId: authorId,
    };

    dispatch(addPost(data));
    clearFromData();
  };

  // update post
  const handleEditClick = (id) => {
    setIsEditing(true);
    setEditId(id);
    const editData = posts?.find((post) => post._id === id)?.title;
    setTitle(editData);
  };

  const updatePostClick = async (postId) => {
    const post = posts?.find((post) => post?._id === postId);
    const data = { ...post, title: title };

    dispatch(updatePost(data));

    clearFromData();
    setIsEditing(false);
    setEditId(null);
  };

  // mark as completed
  const markAsCompleted = async (post, e) => {
    dispatch(fetchPostLoading(true));
    const data = { ...post, completed: e.target.checked };
    dispatch(markCompleted(data));
  };

  // delete post
  const deletePostClick = async (postId) => {
    dispatch(deletePost(postId));
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
    dispatch(fetchPosts());
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
                placeholder="What needs to be done ?"
              />
            </div>
            <div className="action-buttons">
              {/* actions */}
              <div className="actions">
                <Button
                  disabled={title.length === 0 ? true : false}
                  label={isEditing ? "Update Task" : "Add Task"}
                  onClick={() => {
                    isEditing ? updatePostClick(editId) : addPostClick();
                  }}
                  loading={buttonLoading}
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
                        onClick={() => deletePostClick(post?._id)}
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
              {!isFetchingPosts && tempPosts?.length === 0
                ? `No ${activeFilter === "all" ? "" : activeFilter} Tasks!`
                : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsContent;
