import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserPostList from "../components/Dashboard/UserPostList";
import "./UserPost.css"; // Import your CSS file
import { AuthContext } from "../context/AuthContext";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <header className="dashboard-header">
        <h1>Your Posts</h1>
        <div className="dashboard-actions">
          <button className="btn" onClick={handleCreatePost}>
            Create +
          </button>
          <button className="btn" onClick={handleBackToDashboard}>
            All Posts
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
        <UserPostList /> // Render PostList when there's no search query
      )}
    </div>
  );
};

export default UserPost;
