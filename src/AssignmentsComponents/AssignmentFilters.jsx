import React, { useState } from "react";

const AssignmentFilters = ({ onFilterChange }) => {
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <div className="filter-container">
      <label>Filter Assignments: </label>
      <select value={filter} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Homework">Homework</option>
        <option value="Project">Project</option>
        <option value="Quiz">Quiz</option>
        <option value="Test">Test</option>
      </select>
    </div>
  );
};

export default AssignmentFilters;
