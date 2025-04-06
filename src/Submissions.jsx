import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./AllSubmissions.css";
import { useAppContext } from "./context/AppContext";
const AssignmentSubmissions = () => {
  const {API_URL}=useAppContext()
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = Cookies.get("authToken"); // get from cookies
        if (!token) {
          console.error("No auth token found in cookies.");
          return;
        }

        const res = await axios.get(
          `${API_URL}/api/assignment/getsubmission/${assignmentId}`,
          {
            headers: {
              "x-auth-token": token, // send with correct header name
            },
          }
        );

        if (res.data.success) {
          setSubmissions(res.data.submissions);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, [assignmentId]);

  return (
    <div className="all-submissions-container">
      <h2 className="heading">Submissions for Assignment</h2>
      <div className="submission-grid">
        {submissions.length === 0 ? (
          <p>No submissions found.</p>
        ) : (
          submissions.map((submission) => (
            <div key={submission._id} className="submission-card">
              <p><strong>Student:</strong> {submission.studentId.name} ({submission.studentId.email})</p>
              <p><strong>Grade:</strong> {submission.grade}</p>
              <p><strong>Submitted On:</strong> {new Date(submission.submissionDate).toLocaleString()}</p>
              <a href={submission.fileUrl} target="_blank" rel="noreferrer" className="view-file">📄 View Submission</a>
              <details className="feedback-section">
                <summary>📝 View Feedback</summary>
                <pre>{submission.feedback}</pre>
              </details>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentSubmissions;
