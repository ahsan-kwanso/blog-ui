import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserPostList from "../components/Dashboard/UserPostList";
import "./UserPost.css"; // Import your CSS file
import { AuthContext } from "../context/AuthContext";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserPost = () => {
  const { signout } = useContext(AuthContext); // Use the context here
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
          />
          <FontAwesomeIcon icon={faUser} onClick={handleProfile} size="2x" />
        </div>
      </header>
      <UserPostList />
    </div>
  );
};

export default UserPost;
