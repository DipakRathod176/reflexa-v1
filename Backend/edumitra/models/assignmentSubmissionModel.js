const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  grade: {
    type: String,
    default: "Pending",
  },
  feedback: {
    type: String,
    default: "Feedback not available",
  },
});

module.exports = mongoose.model("Submission", submissionSchema);
