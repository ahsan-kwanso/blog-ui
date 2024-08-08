import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance"; // Import your configured axios instance
import "./PostItem.css"; // Import the CSS file for styling
import useError from "../../hooks/useError";

const truncateContent = (content, wordLimit) => {
  const words = content.split(" ");
  if (words.length <= wordLimit) {
    return content;
  }
  return `${words.slice(0, wordLimit).join(" ")} ...`;
};

const PostItem = ({ post }) => {
  const [error, setError] = useError();
  const [success, setSuccess] = useState("");

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
      <h2>{post.title}</h2>
      <p>{truncateContent(post.content, 10)}</p>
      <div className="post-actions">
        <Link to={`/posts/${post.id}`} className="btn view-btn">
          View
        </Link>
        <Link to={`/edit-post/${post.id}`} className="btn edit-btn">
          Edit
        </Link>
        <button className="btn delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {error && <div className="popup error-popup">{error}</div>}
      {success && <div className="popup success-popup">{success}</div>}
    </div>
  );
};

export default PostItem;
