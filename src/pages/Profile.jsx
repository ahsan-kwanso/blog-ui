import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; // Import the CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Set the profile data from the user context
      setProfileData(user);
    }
  }, [user]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Navigate to the dashboard
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-info">
        <FontAwesomeIcon icon={faUser} size="2x" /> {/* Use the icon */}
        <p>
          <strong>Name:</strong> {profileData.name}
        </p>
        <p>
          <strong>Email:</strong> {profileData.email}
        </p>
        <p>
          <strong>Account Created:</strong>{" "}
          {new Date(profileData.createdAt).toLocaleDateString()}
        </p>
      </div>
      <button className="back-button" onClick={handleBackToDashboard}>
        Back To Dashboard
      </button>
    </div>
  );
};

export default Profile;
