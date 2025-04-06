import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentAssignments = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Math Assignment", deadline: "March 30, 2025", status: "Pending" },
    { id: 2, title: "Science Project", deadline: "April 5, 2025", status: "Submitted" },
    { id: 3, title: "History Essay", deadline: "April 10, 2025", status: "Graded" },
    { id: 4, title: "Programming Task", deadline: "April 15, 2025", status: "Pending" },
  ]);

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="assignments-container">


      {/* Main Content */}
      <main className="assignments-content">
        <h2 className="assignment-title">📚 Assignments</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search assignments..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="assignment-grid">
          {filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <h3>{assignment.title}</h3>
              <p><strong>Deadline:</strong> {assignment.deadline}</p>
              <span className={`status-badge ${assignment.status.toLowerCase()}`}>
                {assignment.status}
              </span>
              <div className="progress-bar">
                <div className={`progress ${assignment.status.toLowerCase()}`}></div>
              </div>
              <div className="assignment-buttons">
                <button className="details-button">View Details</button>
                <button className="submit-button">Submit</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentAssignments;
