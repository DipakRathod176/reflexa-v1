// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "teacher", "student"], required: true },
  
  // Only for students
  class: { type: String, required: function () { return this.role === "student"; } }, 
});

const User = mongoose.model("User", userSchema);
module.exports = User;
