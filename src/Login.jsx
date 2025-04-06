import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useAppContext } from "./context/AppContext";
const StudentLogin = () => {
  const {API_URL}=useAppContext()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      if (response.data.token) {
        Cookies.set("authToken", response.data.token, { expires: 7, secure: true, sameSite: "Strict" });
        navigate("/dashboard");
        console.log("Login successful:", response.data);
        alert("Login successful!");
      } else {
        alert("Login failed: No token received.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="card shadow-lg p-4 text-center" style={{ width: "350px" }}>
        <h2 className="mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
