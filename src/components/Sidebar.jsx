import React from "react";
import './sidebar.css';
import { Link, useNavigate } from "react-router-dom";

const Offcanvas = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Delete the authToken cookie
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Redirect to login
    navigate("/login");
  };

  return (
    <div>
      {/* Button to toggle Offcanvas */}
      <button
        style={{ background: 'white', border: 'none' }}
        className="sidebar-toggle-btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#staticBackdrop"
        aria-controls="staticBackdrop"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Offcanvas Component */}
      <div
        className="offcanvas offcanvas-start"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="staticBackdropLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Link to="/dashboard">
          <div>HOME</div>
          </Link>

          {/* Logout Button */}
          <button
            className="btn btn-danger mt-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offcanvas;
