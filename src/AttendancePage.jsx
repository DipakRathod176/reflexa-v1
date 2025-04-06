import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Download, Search, ArrowLeft, User, FilePlus, Bell, Settings, LogOut } from "lucide-react";


const StudentAttendance = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    { name: "Alice", rollNo: "101", status: "Present" },
    { name: "Bob", rollNo: "102", status: "Present" },
    { name: "Charlie", rollNo: "103", status: "Present" },
    { name: "Daniel", rollNo: "104", status: "Present" },
    { name: "Emma", rollNo: "109", status: "Absent" },
    { name: "Lucas", rollNo: "110", status: "Absent" },
  ];

  const presentCount = students.filter((s) => s.status === "Present").length;
  const absentCount = students.length - presentCount;
  const totalStudents = students.length;
  const attendancePercentage = ((presentCount / totalStudents) * 100).toFixed(1);

  const attendanceData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Attendance Percentage",
        data: [95, 92, 88, attendancePercentage],
        backgroundColor: "#4F46E5",
        borderRadius: 10,
      },
    ],
  };

  const handleDownloadReport = () => {
    alert("Downloading Attendance Report (PDF)... 📥");
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm)
  );

  return (
    <div className="dashboard-container">


      <div className="main-content">
        <h1 className="title">📌 Student Attendance</h1>

        <button onClick={() => navigate("/dashboard")} className="back-btn">
          <ArrowLeft className="mr-2" /> Back to Dashboard
        </button>

        <div className="card">
          <h2>📊 Attendance Overview</h2>
          <p>Total Students: {totalStudents}</p>
          <p>Present: {presentCount} | Absent: {absentCount}</p>
          <p>Overall Attendance: {attendancePercentage}%</p>
          <Bar data={attendanceData} />
        </div>

        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search student by name or roll no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="student-grid">
          {["Present", "Absent"].map((status) => (
            <div key={status} className={`student-card ${status.toLowerCase()}`}>
              <h2>{status === "Present" ? "✅ Present Students" : "❌ Absent Students"}</h2>
              <ul>
                {filteredStudents
                  .filter((student) => student.status === status)
                  .map((student) => (
                    <li key={student.rollNo}>
                      {student.name} (Roll No: {student.rollNo})
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <button onClick={handleDownloadReport} className="download-btn">
          <Download className="mr-2" /> Download Report (PDF)
        </button>
      </div>
    </div>
  );
};

export default StudentAttendance;
