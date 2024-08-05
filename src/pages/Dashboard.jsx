import React from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../components/Dashboard/PostList";
import "./DashBoard.css"; // Import your CSS file

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  const handleListPosts = () => {
    navigate("/posts");
  };

  const handleSignOut = () => {
    console.log("Sign out clicked");
    // Add actual sign-out logic here
    // e.g., clearing auth tokens, etc.
    navigate("/login"); // Navigate to login or home page after sign out
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Blog Application</h1>
        <div className="dashboard-actions">
          <button className="btn" onClick={handleCreatePost}>
            Create +
          </button>
          <button className="btn" onClick={handleListPosts}>
            My Posts
          </button>
          <button className="btn" onClick={handleSignOut}>
            Sign Out
          </button>
          <input
            type="text"
            placeholder="Search posts..."
            className="search-input"
          />
        </div>
      </header>
      <PostList />
    </div>
  );
};

export default Dashboard;
