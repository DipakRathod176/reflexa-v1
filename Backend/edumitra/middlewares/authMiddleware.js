const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.auth = (roles) => async (req, res, next) => {
  try {
    // Get the token from headers
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "thisismysecretkey");

    // Fetch user from database
    const userData = await User.findById(decoded.id).select("-password"); // Exclude password
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check user role
    if (roles.length && !roles.includes(userData.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = userData; // Attach user to request
    next(); // Proceed to next middleware or route

  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(401).json({
      message: err.message.includes("expired") ? "Token expired, please log in again" : "Token is not valid"
    });
  }
};
