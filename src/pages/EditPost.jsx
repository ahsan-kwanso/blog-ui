import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance"; // Import your configured axios instance
import "./EditPost.css";

const EditPost = () => {
  const { postId } = useParams(); // Get the postId from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch the post details when component mounts
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${postId}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        setError("Failed to fetch post details.");
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/posts/${postId}`, {
        title,
        content,
      });
      //console.log(response);
      setSuccess("Post updated successfully!");
    } catch (err) {
      if (err.response?.status === 403) {
        setError("Forbidden: You are not allowed to edit this post.");
      } else if (err.response?.status === 401) {
        setError("Unauthorized: Please log in.");
      } else {
        setError("Failed to update post.");
      }
    }
  };

  return (
    <div className="edit-post-container">
      <header className="edit-post-header">
        <h1>Edit Post</h1>
      </header>
      <form className="edit-post-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="edit-post-input"
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="edit-post-textarea"
        />
        <div className="edit-post-buttons">
          <button type="submit" className="btn btn-primary">
            Update Post
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)} // Go back to previous page
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
