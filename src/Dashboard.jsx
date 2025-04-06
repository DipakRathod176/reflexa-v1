import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { MdCreate, MdCloudDownload, MdVideoLibrary, MdQuiz } from "react-icons/md";
import { useAppContext } from "./context/AppContext";
import logo from './logo.png'
import { Link } from "react-router-dom";
const TeacherDashboard = () => {
  const {theme,userData}=useAppContext()
  const [batch, setBatch] = useState("All Batches");

  const studentData = [
    { id: "94170895", name: "Yogita Mithilesh Suryawanshi", batch: "Evening 10th", score: 0 },
    { id: "21986158", name: "Sakshi Limbaj Gawai", batch: "Morning", score: 0 },
    { id: "23388745", name: "Sakshi Prashant Bhalerao", batch: "Morning", score: 0 },
    { id: "15723648", name: "Vaishnavi Parmeshwar Kute", batch: "Morning", score: 0 },
    { id: "39939534", name: "Taufik Md Sahif Shaikh", batch: "Morning", score: 0 },
    { id: "39768526", name: "Mayur Sunil Bangar", batch: "Evening", score: 0 },
    { id: "49870906", name: "Karuna Rajpal Waghmare", batch: "Evening", score: 0 },
  ];

  return (
    <Container fluid className="p-0">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-light shadow">
        <img src={logo} alt={logo} height={70} style={{opacity:'0'}} />
        <h3 className="m-0">Reflexa</h3>

        <div>
          <FaBars size={30} className="me-3" />
          <FaUserCircle size={30} />
        </div>
      </div>

      {/* Quick Links */}
      <div className="text-center p-4 bg-light">
        <h4 className="text-danger">Welcome {userData.name} to {userData.role} Dashboard</h4>
        <h4 className="text-danger">QUICK LINKS</h4>
        <Row className="mt-3">
          <Col md={2}>
          <Link to="/assignments">
          <Button variant="success" className="w-100 p-3"><MdCreate /> Assignments</Button>
          </Link>
           </Col>
          <Col md={2}><Button variant="primary" className="w-100 p-3">Online Tests</Button></Col>
          <Col md={2}><Button variant="dark" className="w-100 p-3">Offline Tests</Button></Col>
          <Col md={2}><Button variant="success" className="w-100 p-3">E-Books</Button></Col>
          <Col md={2}><Button variant="danger" className="w-100 p-3"><MdCloudDownload /> PDF Notes</Button></Col>
          <Col md={2}><Button variant="danger" className="w-100 p-3"><MdVideoLibrary /> YouTube Videos</Button></Col>
        </Row>
      </div>

      {/* Top Scoring Students */}
      <Container className="mt-4">
        <h4 className="text-danger text-center">TOP SCORING STUDENTS</h4>
        <Form.Select value={batch} onChange={(e) => setBatch(e.target.value)} className="mb-3">
          <option>All Batches</option>
          <option>Morning</option>
          <option>Evening</option>
        </Form.Select>

        <Table bordered hover className="text-center">
          <thead className="bg-danger text-white">
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Batch</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {studentData
              .filter((s) => batch === "All Batches" || s.batch.toLowerCase() === batch.toLowerCase())
              .map((student, index) => (
                <tr key={index}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.batch}</td>
                  <td>{student.score}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default TeacherDashboard;
