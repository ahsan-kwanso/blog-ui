import React from "react";
import { Link } from "react-router-dom";
import "./PostItem.css"; // Import the CSS file for styling

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="post-actions">
        <Link to={`/posts/${post.id}`} className="btn view-btn">
          View
        </Link>
        <Link to={`/edit-post/${post.id}`} className="btn edit-btn">
          Edit
        </Link>
        <button className="btn delete-btn">Delete</button>
      </div>
      <div className="comments-section">{/* Add comments here */}</div>
    </div>
  );
};

export default PostItem;
