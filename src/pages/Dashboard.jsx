import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Adjust the path accordingly
import "./DashBoard.css"; // Import your CSS file

const Dashboard = () => {
  const navigate = useNavigate();
  const { signout } = useContext(AuthContext); // Use the context here
  const handleSignout = () => {
    try {
      signout();
      navigate("/login"); // Redirect to signin page after signing out
    } catch (error) {
      console.error("Signout failed:", error);
      // Handle error, e.g., show a message to the user
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="signout-button" onClick={handleSignout}>
          Sign Out
        </button>
      </div>
      <div className="dashboard-content">
        {/* Add your dashboard content here */}
        <p>Welcome to the dashboard!</p>
      </div>
    </div>
  );
};

export default Dashboard;
