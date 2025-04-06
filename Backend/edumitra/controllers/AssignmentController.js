// Controller for Assignments
const express = require("express");
const Assignment = require("../models/assignmentModel");

const createAssignment = async (req, res) => {
    try {
        const assignment = new Assignment({createdBy:req.user._id, ...req.body});
        await assignment.save();
        res.status(201).json(assignment);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message });

    }
};

const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().populate("createdBy");
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id).populate("createdBy");
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });
        res.json(assignment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });
        res.json(assignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.id);
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });
        res.json({ message: "Assignment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const submitAssignment = async (req, res) => {
    try {
        const { studentId, fileUrl } = req.body;
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        const submission = {
            studentId,
            fileUrl,
            submissionDate: new Date(),
            grade: "Pending",
            feedback: ""
        };

        assignment.submissions.push(submission);
        await assignment.save();

        res.status(200).json({ message: "Assignment submitted successfully", assignment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createAssignment, getAssignments, getAssignmentById, updateAssignment, deleteAssignment, submitAssignment };
