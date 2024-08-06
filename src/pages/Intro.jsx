import React from "react";
import { Link } from "react-router-dom";
import "./Intro.css"; // Import your CSS file

const Intro = () => {
  return (
    <div className="intro-container">
      <div className="intro-content">
        <h1>Welcome to the Blog Application</h1>
        <p>
          Explore and create engaging blog posts, comment on articles, and
          interact with other users.
        </p>
        <div className="intro-actions">
          <Link to="/signup" className="btn primary-btn">
            Get Started
          </Link>
          <Link to="/login" className="btn secondary-btn">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Intro;
