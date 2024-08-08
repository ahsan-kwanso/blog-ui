import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import "./CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/posts", {
        title,
        content,
      });

      setTitle("");
      setContent("");
      setSuccess("Post created successfully!");
    } catch (error) {
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="create-post-container">
      <header className="create-post-header">
        <h1>Create New Post</h1>
      </header>
      <form className="create-post-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="create-post-input"
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="create-post-textarea"
        />
        <div className="create-post-buttons">
          <button type="submit" className="btn btn-primary">
            Save Post
          </button>
          <div>
            <button
              type="button"
              className="btn btn-secondary btn-cancel"
              onClick={() => {
                setTitle("");
                setContent("");
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-back"
              onClick={() => navigate(-1)} // Go back to previous page
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
