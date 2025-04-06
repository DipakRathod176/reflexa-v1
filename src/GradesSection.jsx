import React, { useState } from "react";


const GradesSection = () => {
  const studentGrades = [
    { subject: "History", assignment: "World War II Analysis", grade: 88 },
    { subject: "English", assignment: "Essay on Shakespeare", grade: 78 },
    { subject: "Science", assignment: "Physics Lab Report", grade: 85 },
    { subject: "Science", assignment: "Physics Lab Report", grade: 85 },
  ];

  const getFeedback = (grade) => {
    if (grade >= 90) return "🌟 Excellent work! Keep it up!";
    if (grade >= 80) return "✅ Good job! Some minor improvements needed.";
    if (grade >= 70) return "⚠️ Decent effort! Focus on key concepts.";
    return "❌ Needs improvement. Review and practice more.";
  };

  return (
    <div className="content">
      <h2>GRADES AND FEEDBACK</h2>
      <div className="grades-list">
        {studentGrades.map((item, index) => (
          <div className="grade-card" key={index}>
            <h3>{item.subject} - {item.assignment}</h3>
            <p>Grade: <span className="grade">{item.grade}%</span></p>
            <p className="feedback">{getFeedback(item.grade)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [profileName, setProfileName] = useState("Student Name");
  const [email, setEmail] = useState("student@example.com");
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

  return (
    <div className="dashboard-container">

      <GradesSection />

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

export default App;