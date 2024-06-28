import React, { useState } from "react";
import "./UserForm.scss"; // Import the compiled CSS
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const UserForm = () => {
  // const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    contact: "",
    profilePicture: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { name, email, username, contact, profilePicture } = formData;

    // Create form data object
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("username", username);
    data.append("contactInfo", contact);
    if (profilePicture) {
      data.append("profilePicture", profilePicture);
    }

    try {
      await axios.post("http://localhost:5000/api/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).catch((e)=>{
        console.log(e);
      });
      setLoading(false);
      alert("User registered successfully.");
      setFormData({
        name: "",
        email: "",
        username: "",
        contact: "",
        profilePicture: null,
      });
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      username: "",
      contact: "",
      profilePicture: null,
    });
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
        <Link to="/user-list">
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
            User List
          </button>
        </Link>
      </div>
      <div className="form-container">
        <h2 style={{ color: "#6673DE" }}>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              maxLength={10}
              minLength={10}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              required
              onChange={handleFileChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
