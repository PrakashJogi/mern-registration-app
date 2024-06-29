import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.scss";
import bcrypt from "bcryptjs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const LoginForm = ({ setUser }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //   const salt = await bcrypt.genSalt(10);
      //   const hashedPassword = await bcrypt.hash(password, salt);
      const response = await axios
        .post("http://localhost:5000/api/users/login", {
          usernameOrEmail: usernameOrEmail,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem("token", token); // Store the token in localStorage
            setUser(token)
            navigate("/user-list");
            setError("");
          } else {
            setError("Something went wrong");
          }
        });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <div
        style={{
          alignItems: "end",
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        <Link to="/">
          <button
            style={{
              padding: 8,
              marginBottom: 8,
              paddingLeft: 12,
              paddingRight: 12,
              backgroundColor: "#6673DE",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              color: "white",
            }}
          >
            Sign Up
          </button>
        </Link>
      </div>
      <div className="login-form">
        <h2 style={{ color: "#6673DE" }}>User Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email:
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => {
                setUsernameOrEmail(e.target.value);
                setError("");
              }}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
