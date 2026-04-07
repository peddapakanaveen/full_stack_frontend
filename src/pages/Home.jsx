import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">

      <div className="home-left"></div>

      <div className="home-right">
        <h1>Welcome to CareerConnect</h1>
        <p>
          Discover your career path and connect with expert counsellors
          to build your future confidently.
        </p>

        {!showOptions ? (
          <button
            className="explore-btn"
            onClick={() => setShowOptions(true)}
          >
            Explore Now
          </button>
        ) : (
          <div className="auth-options">
            <button
              className="auth-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="auth-btn"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;