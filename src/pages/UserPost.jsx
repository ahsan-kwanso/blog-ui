import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserPostList from "../components/Dashboard/UserPostList";
import "./UserPost.css"; // Import your CSS file
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Dashboard/Header";
import SearchPostList from "../components/Dashboard/SearchPostList";

const UserPost = () => {
  const { signout } = useContext(AuthContext); // Use the context here
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const handleSignOut = () => {
    signout();
    navigate("/login"); // Redirect to signin page after signing out
  };
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
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
        onListPosts={handleBackToDashboard}
        onSignOut={handleSignOut}
        onProfile={handleProfile}
        listPostsLabel="All Posts"
      />
      {searchQuery ? (
        <SearchPostList searchQuery={searchQuery} /> // Render SearchPostList when there's a search query
      ) : (
        <UserPostList /> // Render PostList when there's no search query
      )}
    </div>
  );
};

export default UserPost;
