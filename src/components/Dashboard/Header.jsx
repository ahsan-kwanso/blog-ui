import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "./Header.css"; // Import CSS for header styling

const DashboardHeader = ({
  searchQuery,
  onSearchChange,
  onCreatePost,
  onListPosts,
  onSignOut,
  onProfile,
}) => {
  return (
    <header className="dashboard-header">
      <h1>Blog Application</h1>
      <div className="dashboard-actions">
        <button className="btn" onClick={onCreatePost}>
          Create +
        </button>
        <button className="btn" onClick={onListPosts}>
          My Posts
        </button>
        <button className="btn" onClick={onSignOut}>
          Sign Out
        </button>
        <input
          type="text"
          placeholder="Search posts..."
          className="search-input"
          value={searchQuery}
          onChange={onSearchChange}
        />
        <FontAwesomeIcon
          icon={faUser}
          onClick={onProfile}
          size="2x"
          className="btn"
        />
      </div>
    </header>
  );
};

export default DashboardHeader;
