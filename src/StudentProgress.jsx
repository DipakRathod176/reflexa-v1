import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";


const StudentProgress = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const classPerformanceData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Average Class Score",
        data: [75, 80, 78, 85],
        backgroundColor: ["#4F46E5", "#22c55e", "#eab308", "#ef4444"],
        borderRadius: 8,
      },
    ],
  };

  const topPerformers = [
    { name: "Alice", rollNo: "101", score: 95 },
    { name: "Bob", rollNo: "102", score: 92 },
    { name: "Charlie", rollNo: "103", score: 91 },
  ];

  const strugglingStudents = [
    { name: "David", rollNo: "108", score: 50 },
    { name: "Emma", rollNo: "109", score: 55 },
  ];

  // Filter students based on search query
  const filteredStudents = [...topPerformers, ...strugglingStudents].filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.includes(searchQuery)
  );

  return (
    <div className="dashboard-container">

      {/* Main Content */}
      <div className="main-content">
        <h1 className="title">📊 Student Progress</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search student..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        {/* Performance Chart */}
        <div className="chart-card">
          <h2>📈 Class Performance</h2>
          <Bar data={classPerformanceData} />
        </div>

        {/* Student Lists (Grid Layout) */}
        <div className="student-grid">
          {/* Top Performers */}
          <div className="student-card top-performers">
            <h2>🏆 Top Performers</h2>
            <ul>
              {topPerformers.map((student) => (
                <li key={student.rollNo}>
                  {student.name} (Roll No: {student.rollNo}) -{" "}
                  <span className="score green">{student.score}%</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Struggling Students */}
          <div className="student-card struggling">
            <h2>⚠️ Needs Improvement</h2>
            <ul>
              {strugglingStudents.map((student) => (
                <li key={student.rollNo}>
                  {student.name} (Roll No: {student.rollNo}) -{" "}
                  <span className="score red">{student.score}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Filtered Students List */}
        <div className="student-card all-students">
          <h2>📋 Student List</h2>
          <ul>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <li key={student.rollNo}>
                  {student.name} (Roll No: {student.rollNo}) -{" "}
                  <span className={`score ${student.score < 60 ? "red" : "green"}`}>
                    {student.score}%
                  </span>
                </li>
              ))
            ) : (
              <p>No student found.</p>
            )}
          </ul>
        </div>

        {/* Download Report Button */}
        <button className="download-btn">📥 Download Report (PDF)</button>
      </div>
    </div>
  );
};

export default StudentProgress;
