import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance"; // Import your configured axios instance
import "./PostItem.css"; // Import the CSS file for styling
import useError from "../../hooks/useError";
import PostActions from "../Post/PostActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { truncateContent } from "../../utils/truncateContent";

const PostItem = ({ post }) => {
  const [error, setError] = useError();
  const [success, setSuccess] = useState("");
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post.id}`);
      setSuccess("Post deleted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      // Optionally, trigger a re-fetch or update parent component state
    } catch (err) {
      if (err.response?.status === 403) {
        setError("Forbidden: You are not allowed to delete this post.");
      } else if (err.response?.status === 401) {
        setError("Unauthorized: Please log in.");
      } else {
        setError("Failed to delete post.");
      }
    }
  };

  return (
    <div className="post-item">
      <h2>{truncateContent(post.title, 5)}</h2>
      <p>{truncateContent(post.content, 24)}</p>
      <PostActions post={post} onDelete={handleDelete} />
      {error && <div className="popup error-popup">{error}</div>}
      {success && <div className="popup success-popup">{success}</div>}
    </div>
  );
};

export default PostItem;
