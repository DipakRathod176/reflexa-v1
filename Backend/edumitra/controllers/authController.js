// authController.js
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password,role,classs } = req.body;
  console.log(req.body)

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user object, conditionally adding fields based on role
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      class:classs

    });

    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      "thisismysecretkey",
      { expiresIn: "7h" }
    );

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "thisismysecretkey",
      { expiresIn: "7h" }
    );

    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update User Status (Admin Only)
exports.updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User status updated successfully", user });
  } catch (err) {
    console.error("Error updating user status:", err);
    res.status(500).json({ message: "Server error" });
  }
};
