import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Line } from "react-chartjs-2";
import "chart.js/auto";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState("Ststudent@example.comudent Name");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  const removeProfilePic = () => {
    setProfilePic("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
  };

  const performanceData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Assignment Completion (%)",
        data: [70, 80, 85, 90],
        fill: false,
        backgroundColor: "#2ecc71",
        borderColor: "#2ecc71",
      },
    ],
  };

  return (
    <div className="dashboard">

      {/* Main Content */}
      <main className="main-content">
        <h1 className="title">🎓 Student Dashboard</h1>

        {/* Assignment Progress */}
        <section className="performance-section">
          <h2>📊 Assignment Completion</h2>
          <Line data={performanceData} />
        </section>

        {/* Upcoming Assignments */}
        <section className="upcoming-assignments">
          <h2>📅 Upcoming Assignments</h2>
          <ul>
            <li><strong>Math Homework</strong> - Due: 20th March</li>
            <li><strong>Science Project</strong> - Due: 25th March</li>
            <li><strong>AI Report</strong> - Due: 30th March</li>
          </ul>
        </section>
      </main>

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <h2>Edit Profile</h2>
            <label>Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            <button onClick={removeProfilePic}>Remove Profile Picture</button>

            <label>Name</label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={() => setShowProfileModal(false)}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
