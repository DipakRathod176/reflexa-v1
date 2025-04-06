const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Assignment = require("../models/assignmentModel");
const Submission = require("../models/assignmentSubmissionModel"); // Import Submission model
const { v4: uuidv4 } = require("uuid");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs").promises;
const { fetch } = require("undici");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadAssignmentImage = upload.single("file");

async function downloadImage(url, filePath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(filePath, buffer);
  } catch (error) {
    console.error("Image Download Error:", error);
    throw error;
  }
}

async function generateGradingAndFeedback(imageURL, promptText) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const tempFilePath = "temp_image.jpg";

    await downloadImage(imageURL, tempFilePath);
    const imageFile = await fs.readFile(tempFilePath, { encoding: "base64" });

    const imagePart = {
      inlineData: {
        data: imageFile,
        mimeType: "image/jpeg",
      },
    };

    const fullPrompt = `Analyze the image and provide a grade and feedback. ${promptText} 
    Also, provide a score from 0 to 100 on the accuracy of the answer. Include feedback on the structure and clarity of the answer, and how it can be improved.`;

    const result = await model.generateContent([fullPrompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    await fs.unlink(tempFilePath);
    return text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Error in generating grading and feedback.";
  }
}

// ✅ Submit Assignment with AI Grading
const submitAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ success: false, message: "Assignment not found" });

    if (!req.file) return res.status(400).json({ success: false, message: "Assignment image is required" });

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "assignments",
          public_id: `${uuidv4()}-${req.file.originalname.split(".")[0]}`,
        },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    const fileUrl = uploadResult.secure_url;
    const gradingPrompt = "The image contains a student's assignment submission. Grade and provide feedback.";

    const aiFeedback = await generateGradingAndFeedback(fileUrl, gradingPrompt);
    const extractedGrade = aiFeedback.match(/\b\d{1,3}\b/) ? aiFeedback.match(/\b\d{1,3}\b/)[0] + "/100" : "Pending";

    const submission = new Submission({
      studentId: req.user._id,
      assignmentId: assignment._id,
      fileUrl: fileUrl,
      submissionDate: new Date(),
      grade: extractedGrade,
      feedback: aiFeedback || "Feedback not available",
    });

    await submission.save();

    res.status(200).json({ 
      success: true, 
      message: "Assignment submitted successfully",
      grade: submission.grade,
      feedback: submission.feedback,
      submission,
    });

  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// ✅ New Endpoint: Get All Submissions
const getAllSubmissions = async (req, res) => {
  let id =req.params.id

  try {
    const submissions = await Submission.find({assignmentId:id})
      .populate("studentId", "name email") // Fetch student details
      .populate("assignmentId", "title description"); // Fetch assignment details

    res.status(200).json({ success: true, submissions });
  } catch (error) {
    console.error("Get Submissions Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

module.exports = { submitAssignment, getAllSubmissions, uploadAssignmentImage };
