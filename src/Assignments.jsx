import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Form, Spinner } from "react-bootstrap";
import { useAppContext } from "./context/AppContext";
import { Link } from "react-router-dom";

const CreateAssignment = () => {
  const { theme,API_URL, userData } = useAppContext();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [showForm, setShowForm] = useState(false);
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    subject: "",
    dueDate: "",
  });

  // Get auth-token from cookies
  const getAuthToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken"))
      ?.split("=")[1];
  };

  // Fetch assignments from API
  const fetchAssignments = async () => {
    setLoading(true); // ✅ Show spinner
    const token = getAuthToken();
    if (!token) {
      alert("Auth token not found!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/assignment/assignments`, {
        headers: { "x-auth-token": token },
      });
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
    setLoading(false); // ✅ Hide spinner
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) return alert("Auth token not found!");

    try {
      const response = await fetch(`${API_URL}/api/assignment/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(assignment),
      });

      if (response.ok) {
        alert("Assignment Created Successfully!");
        setShowForm(false);
        setAssignment({ title: "", description: "", subject: "", dueDate: "" });
        fetchAssignments(); // ✅ Auto-fetch after submission
      } else {
        alert("Error creating assignment");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Assignments</h2>
      {userData.role === "admin" && (
        <Button variant="primary" className="mb-3" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Create Assignment"}
        </Button>
      )}

      {showForm && (
        <Form onSubmit={handleSubmit} className="mb-4">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={assignment.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" value={assignment.description} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" name="subject" value={assignment.subject} onChange={handleChange} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" name="dueDate" value={assignment.dueDate} onChange={handleChange} required />
          </Form.Group>

          <Button type="submit" variant="success" className="mt-3">
            Submit Assignment
          </Button>
        </Form>
      )}

      {/* ✅ Show loading spinner */}
      {loading ? (
        <div className="text-center mt-3">
          <Spinner animation="border" variant="primary" />
          <p>Loading assignments...</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Subject</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assign, index) => (
              <tr key={index}>
                <td>{assign.title}</td>
                <td>{assign.description}</td>
                <td>{assign.subject}</td>
                <td>{new Date(assign.dueDate).toLocaleDateString()}</td>
                {userData.role === 'admin' ? <td><Link to={`/assignments/get-all-submissions/${assign._id}`}>
                  <button>View All Submissions</button>
                </Link>
                </td> :
                  <td><Link to={`/assignments/submission/${assign._id}`}>
                    <button>Submission</button>
                  </Link>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CreateAssignment;
