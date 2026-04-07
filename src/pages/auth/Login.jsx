import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import "./Login.css";

const Login = () => {
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email: username,
        password: password,
      });

      console.log("LOGIN RESPONSE:", res.data); // ✅ DEBUG

      if (!res.data) {
        alert("Invalid Credentials");
        return;
      }

      // ✅ Store user data
      localStorage.setItem("user", JSON.stringify(res.data));

      // ✅ Keep existing auth logic
      login(username, role);

      alert("Login Successful");

      // ✅ Navigation (unchanged)
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "counsellor") {
        navigate("/counsellor");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error.response || error); // ✅ DEBUG

      if (error.response) {
        alert(
          error.response.data?.message ||
          "Invalid credentials or server error"
        );
      } else {
        alert("Backend not reachable. Check if server is running.");
      }
    }
  };

  return (
    <div className="login-wrapper">

      {/* Left Side */}
      <div className="login-left"></div>

      {/* Right Side */}
      <div className="login-right">
        <h2>LOGIN TO YOUR ACCOUNT</h2>

        {/* Role Selection */}
        <div className="role-selector">
          <button
            type="button"
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            User
          </button>

          <button
            type="button"
            className={role === "counsellor" ? "active" : ""}
            onClick={() => setRole("counsellor")}
          >
            Counsellor
          </button>

          <button
            type="button"
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username :</label>
            <input
              type="text"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;