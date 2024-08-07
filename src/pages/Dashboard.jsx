import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../components/Dashboard/PostList";
import "./DashBoard.css"; // Import your CSS file
import { AuthContext } from "../context/AuthContext";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
  const { signout } = useContext(AuthContext); // Use the context here
  const handleSignOut = () => {
    signout();
    navigate("/login"); // Redirect to signin page after signing out
  };
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  const handleListPosts = () => {
    navigate("/dashboard/posts");
  };

  const handleProfile = () => {
    navigate("/profile");
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
          <FontAwesomeIcon
            icon={faUser}
            onClick={handleProfile}
            size="2x"
            className="btn"
          />
        </div>
      </header>
      <PostList />
    </div>
  );
};

export default Dashboard;
