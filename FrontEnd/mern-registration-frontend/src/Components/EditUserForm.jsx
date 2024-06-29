import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./EditUserForm.scss";

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    maxWidth: "500px",
    maxHeight: "80vh",
    overflow: "auto",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    padding: "15px",
  },
};

const EditUserForm = ({ isOpen, onRequestClose, user, getUserList }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [contactInfo, setContact] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setUsername(user.username);
      setContact(user.contactInfo);
      setProfilePicture(user.profilePicture);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${user._id}`, {
        name,
        email,
        username,
        contactInfo,
        profilePicture,
      });
      alert("User updated successfully.");
      getUserList();
      onRequestClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Edit User Modal"
    >
      <div className="edit-user-form">
        <h2 style={{color:'#6673DE'}}>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Contact:
            <input
              type="tel"
              value={contactInfo}
              onChange={(e) => setContact(e.target.value)}
              required
              maxLength={10}
              minLength={10}
            />
          </label>
          <label>
            Profile Picture:
            <input
              type="text"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
          </label>
          <button type="submit" style={{ alignSelf: "center", width: "50%" }}>
            Edit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditUserForm;
