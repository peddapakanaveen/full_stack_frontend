import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // ✅ Protect route
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    }
  }, [navigate]);

  // ✅ Fetch user
  useEffect(() => {
    API.get("/users/profile")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="dashboard">

      {/* 🔥 HEADER */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome to Your Portal</h1>

        {/* ✅ Bigger & Stylish Name */}
        {user && (
          <h2 className="welcome-user">
            Hello, <span>{user.name}</span>
          </h2>
        )}
      </div>

      {/* ✅ EXISTING FEATURES (UNCHANGED) */}
      <div className="cards-container">
        <div className="card" onClick={() => navigate("/careers")}>
          Career Options
        </div>

        <div className="card" onClick={() => navigate("/book")}>
          Book a Session
        </div>

        <div className="card" onClick={() => navigate("/colleges")}>
          View Colleges
        </div>

        <div className="card" onClick={() => navigate("/guidance")}>
          Career Guidance
        </div>

        <div className="card" onClick={() => navigate("/resources")}>
          Resources
        </div>

        <div className="card" onClick={() => navigate("/performance")}>
          Performance
        </div>

        <div className="card" onClick={() => navigate("/roadmap")}>
          Career Builder
        </div>

        <div className="card" onClick={() => navigate("/resume-analyzer")}>
          Resume Checker
        </div>
      </div>
    </div>
  );
}

export default Dashboard;