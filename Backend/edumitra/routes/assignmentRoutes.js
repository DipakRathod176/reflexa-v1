// Routes for Assignments
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { 
  createAssignment, 
  getAssignments, 
  getAssignmentById, 
  updateAssignment, 
  deleteAssignment 
} = require("../controllers/AssignmentController");

const { submitAssignment, uploadAssignmentImage,getAllSubmissions } = require("../controllers/assignmentSubmissionController");
const { auth } = require("../middlewares/authMiddleware");

// Multer Middleware for File Upload
router.post("/assignments", auth(["admin"]), createAssignment);
router.get("/assignments", auth(["admin", "student"]), getAssignments);
router.get("/assignments/:id", auth(["admin", "student"]), getAssignmentById);
router.put("/assignments/:id", auth(["admin"]), updateAssignment);
router.delete("/assignments/:id", auth(["admin"]), deleteAssignment);

// Add multer middleware for file uploads
router.post("/assignments/:id/submit", auth(["student"]), uploadAssignmentImage, submitAssignment);
router.get("/getsubmission/:id", auth(["admin"]), getAllSubmissions);

module.exports = router;
