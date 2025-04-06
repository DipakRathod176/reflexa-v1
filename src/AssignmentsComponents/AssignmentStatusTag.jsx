import React from "react";

const AssignmentStatusTag = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "In Progress":
        return "status-inprogress";
      case "Completed":
        return "status-completed";
      case "Overdue":
        return "status-overdue";
      default:
        return "";
    }
  };

  return <span className={`status-tag ${getStatusClass()}`}>{status}</span>;
};

export default AssignmentStatusTag;
