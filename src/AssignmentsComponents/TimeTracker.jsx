import React, { useEffect, useState } from "react";

const TimeTracker = () => {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-tracker">
      <h3>⏳ Time Spent: {Math.floor(timeSpent / 60)} min {timeSpent % 60} sec</h3>
    </div>
  );
};

export default TimeTracker;
