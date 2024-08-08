// src/pages/Dashboard.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../components/Dashboard/PostList";
import SearchPostList from "../components/Dashboard/SearchPostList";
import "./DashBoard.css"; // Import your CSS file
import { AuthContext } from "../context/AuthContext";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { signout } = useContext(AuthContext); // Use the context here
  const navigate = useNavigate();

  const handleSignOut = () => {
    signout();
    navigate("/login"); // Redirect to signin page after signing out
  };

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  const handleListPosts = () => {
    navigate("/dashboard/posts");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query on input change
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
            value={searchQuery}
            onChange={handleSearchChange} // Update search query on input change
          />
          <FontAwesomeIcon
            icon={faUser}
            onClick={handleProfile}
            size="2x"
            className="btn"
          />
        </div>
      </header>
      {searchQuery ? (
        <SearchPostList searchQuery={searchQuery} /> // Render SearchPostList when there's a search query
      ) : (
        <PostList /> // Render PostList when there's no search query
      )}
    </div>
  );
};

export default Dashboard;
