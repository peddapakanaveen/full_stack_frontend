import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Resources.css";

// ✅ NEW: API import
import API from "../services/api";

function Resources() {
  const navigate = useNavigate();

  // ✅ NEW: backend state
  const [resourceData, setResourceData] = useState([]);

  // ✅ EXISTING DATA (UNCHANGED)
  const resources = [
    {
      id: "1",
      title: "Career Guidance PDF",
      short: "Complete guide to choosing the right career path."
    },
    {
      id: "2",
      title: "Resume Template",
      short: "Download a professional resume format."
    },
    {
      id: "3",
      title: "Interview Preparation Video",
      short: "Tips and tricks to crack interviews."
    }
  ];

  // ✅ NEW: fetch from backend
  useEffect(() => {
    API.get("/resources")
      .then((res) => {
        setResourceData(res.data);
      })
      .catch((err) => {
        console.log("Using default resources (backend not connected)");
      });
  }, []);

  // ✅ NEW: backend OR fallback
  const displayResources =
    resourceData.length > 0 ? resourceData : resources;

  return (
    <div className="resources-container">
      <h1 className="resources-heading">Learning Resources</h1>

      <div className="resources-grid">
        {displayResources.map((item) => (
          <div className="resource-card" key={item.id}>
            <h2>{item.title}</h2>

            {/* ✅ supports both frontend & backend fields */}
            <p>{item.short || item.description}</p>

            <button
              className="explore-btn"
              onClick={() => navigate(`/resource/${item.id}`)}
            >
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;