import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Alert, Modal } from "react-bootstrap";
import { FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "./context/AppContext";
const AssignmentSubmission = () => {
  const {API_URL}=useAppContext()
  const { assignmentId } = useParams();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assignmentDetails, setAssignmentDetails] = useState(null);

  // Fetch assignment details
  useEffect(() => {
    const fetchAssignment = async () => {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
  
      try {
        const response = await axios.get(
          `${API_URL}/api/assignment/assignments/${assignmentId}`,
          {
            headers: {
              "x-auth-token": authToken,
            },
          }
        );
        setAssignmentDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch assignment details:", error);
      }
    };
  
    fetchAssignment();
  }, [assignmentId]);
  ;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setStatus("error");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      const response = await axios.post(
        `${API_URL}/api/assignment/assignments/${assignmentId}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": authToken,
          },
        }
      );

      setResponseData(response.data);
      setStatus("success");
      setShowPopup(true);
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <Container className="mt-5 p-4 shadow-lg bg-light rounded" style={{ maxWidth: "600px" }}>
      <h3 className="text-center text-danger">📚 Assignment Submission</h3>
      <hr />

      {assignmentDetails ? (
        <>
          <p><strong>Title:</strong> {assignmentDetails.title}</p>
          <p><strong>Description:</strong> {assignmentDetails.description}</p>
          <p><strong>Subject:</strong> {assignmentDetails.subject}</p>
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(assignmentDetails.dueDate).toLocaleDateString()}
          </p>
        </>
      ) : (
        <Alert variant="info">Loading assignment details...</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fileUpload" className="mb-3">
          <Form.Label><FaUpload /> Upload Your Assignment</Form.Label>
          <Form.Control type="file" accept=".jpg,.png,.jpeg,.pdf,.docx" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="success" type="submit" className="w-100" disabled={loading}>
          {loading ? "Submitting..." : "Submit Assignment"}
        </Button>
      </Form>

      {status === "error" && (
        <Alert variant="danger" className="mt-3">
          {file ? "Submission failed. Try again." : "Please upload a file before submitting."}
        </Alert>
      )}

      {/* Success Popup */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assignment Submission Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {responseData ? (
            <>
              <h5><FaCheckCircle className="text-success" /> {responseData.message}</h5>
              <p><strong>Grade:</strong> {responseData.grade}</p>
              <p><strong>Feedback:</strong></p>
              <pre style={{ whiteSpace: "pre-wrap" }}>{responseData.feedback}</pre>
            </>
          ) : (
            <p><FaTimesCircle className="text-danger" /> Submission failed. Try again.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPopup(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AssignmentSubmission;
