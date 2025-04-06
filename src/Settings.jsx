import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Settings = () => {
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState("Teacher Name");
  const [email, setEmail] = useState("teacher@example.com");
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || null);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePic = () => {
    setProfilePic(null);
    localStorage.removeItem("profilePic");
  };

  const handleSaveChanges = () => {
    setSavedMessage("✅ Changes saved successfully!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  return (
    <div className="dashboard-container">

      {/* Main Content */}
      <div className="main-content">
        <h1>⚙️ Settings</h1>

        {/* Profile Picture */}
        <div className="profile-section">
          <div className="profile-circle">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="profile-pic" />
            ) : (
              <span className="profile-placeholder">👤</span>
            )}
          </div>
          <input type="file" id="upload" onChange={handleProfilePicChange} hidden />
          <label htmlFor="upload" className="upload-btn">📤 Upload Picture</label>
          {profilePic && (
            <button onClick={removeProfilePic} className="remove-pic-btn">
              ❌ Remove Picture
            </button>
          )}
        </div>

        {/* Profile Information */}
        <div className="profile-info">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="save-btn" onClick={handleSaveChanges}>💾 Save Changes</button>
        {savedMessage && <p className="saved-message">{savedMessage}</p>}
      </div>
    </div>
  );
};

export default Settings;
