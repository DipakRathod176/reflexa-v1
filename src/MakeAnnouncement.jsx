import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const MakeAnnouncement = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Announcement Posted:\nTitle: ${title}\nMessage: ${message}`);
    setTitle("");
    setMessage("");
  };

  return (
    <div className="dashboard-container">

      {/* Main Content */}
      <div className="main-content">
        <h2>📢 Make an Announcement</h2>
        <form onSubmit={handleSubmit} className="announcement-form">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            required
            className="announcement-input"
          />

          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your announcement here..."
            required
            className="announcement-textarea"
          ></textarea>

          <button type="submit" className="send-btn">Send Announcement</button>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
