import React, { useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./AssignmentCalendar.css"; // Ensure correct spelling

const AssignmentCalendar = ({ assignments }) => {
  // Use useMemo to optimize performance
  const assignmentDates = useMemo(() => 
    assignments.map((a) => new Date(a.deadline)), [assignments]);

  return (
    <div className="calendar-container">
      <h2>📅 Assignment Calendar</h2>
      <Calendar
        tileContent={({ date }) => {
          const isAssignmentDate = assignmentDates.some(
            (d) => d.toDateString() === date.toDateString()
          );
          return isAssignmentDate ? <span className="calendar-dot"></span> : null;
        }}
      />
    </div>
  );
};

export default AssignmentCalendar;
