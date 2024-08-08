// src/pages/Dashboard.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../components/Dashboard/PostList";
import SearchPostList from "../components/Dashboard/SearchPostList";
import "./DashBoard.css"; // Import your CSS file
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Dashboard/Header";

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
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onCreatePost={handleCreatePost}
        onListPosts={handleListPosts}
        onSignOut={handleSignOut}
        onProfile={handleProfile}
      />
      {searchQuery ? (
        <SearchPostList searchQuery={searchQuery} /> // Render SearchPostList when there's a search query
      ) : (
        <PostList /> // Render PostList when there's no search query
      )}
    </div>
  );
};

export default Dashboard;
