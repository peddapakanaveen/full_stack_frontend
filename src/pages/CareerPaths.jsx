import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptopCode, FaUserMd, FaBalanceScale, FaChartLine, FaPaintBrush } from "react-icons/fa";

// ✅ NEW: import service
import { getAllCareers } from "../services/careerService";

function Careers() {
  const navigate = useNavigate();

  // ✅ NEW: state
  const [careerData, setCareerData] = useState([]);

  // ✅ EXISTING fallback data (UNCHANGED)
  const careers = [
    { title: "Engineering", icon: <FaLaptopCode />, path: "/engineering" },
    { title: "Medical", icon: <FaUserMd />, path: "/medical" },
    { title: "Law", icon: <FaBalanceScale />, path: "/law" },
    { title: "Business", icon: <FaChartLine />, path: "/business" },
    { title: "Arts & Design", icon: <FaPaintBrush />, path: "/arts" },
  ];

  // ✅ NEW: API call
  useEffect(() => {
    getAllCareers()
      .then((res) => {
        setCareerData(res.data);
      })
      .catch((err) => {
        console.log("Backend not connected, using default careers");
      });
  }, []);

  // ✅ NEW: use backend if available, else fallback
  const displayCareers = careerData.length > 0 ? careerData : careers;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Explore Career Paths</h1>

      <div style={styles.grid}>
        {displayCareers.map((career, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => navigate(career.path || "/careers")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-12px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
            }}
          >
            {/* ✅ keep icons for default, backend may not have icons */}
            <div style={styles.icon}>
              {career.icon || <FaLaptopCode />}
            </div>

            <h3 style={styles.cardTitle}>
              {career.title || career.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "60px 20px",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    textAlign: "center",
  },
  title: {
    color: "#fff",
    marginBottom: "50px",
    fontSize: "34px",
    fontWeight: "600",
    letterSpacing: "1px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "30px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  card: {
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.15)",
    padding: "40px 20px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#fff",
  },
  icon: {
    fontSize: "45px",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "500",
  },
};

export default Careers;