import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./context/AppContext";
const StudentSignup = () => {
  const {API_URL}=useAppContext()
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [studentClass, setStudentClass] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const authToken = Cookies.get("authToken"); // Get token from cookies

    if (!authToken) {
      toast.error("Unauthorized: Admin token not found.");
      return;
    }

    const payload = {
      name,
      email,
      password,
      role,
    };

    if (role === "student") {
      payload.classs = studentClass;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        payload,
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      toast.success("Registration successful!");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
      <ToastContainer />
      <div className="card shadow-lg p-4 text-center" style={{ width: "400px" }}>
        <h2 className="mb-4">User Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {role === "student" && (
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Class (e.g., 10-A)"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
