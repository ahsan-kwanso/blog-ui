import React, { useState } from "react";
import "./EditPost.css";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="edit-post-container">
      <header className="edit-post-header">
        <h1>Edit Post</h1>
      </header>
      <form className="edit-post-form" onSubmit={handleSubmit}>
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
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
