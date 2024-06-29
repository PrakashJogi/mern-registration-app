import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserList.scss"; // Import the compiled CSS
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import EditUserForm from "./EditUserForm";

const UserList = ({ onEdit, setUser }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State to manage editing user
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage edit modal
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          alert("Something Went wrong");
        }
      })
      .catch((e) => {
        // alert("Something Went wrong");
        console.log(e);
      });
  };
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        getUserList();
        alert("User deleted successfully.");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = (user) => {
    setEditingUser(user); // Set the user to edit
    setIsEditModalOpen(true); // Open the edit modal
  };
  const handleCloseEdit = () => {
    setEditingUser(null); // Clear editing user
    setIsEditModalOpen(false); // Close edit modal
  };
  return (
    <div className="user-list-container">
      <div>
        <Link to="/user-login">
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
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
              navigate("/");
            }}
          >
            Logout
          </button>
        </Link>
      </div>
      <h2 className="user-list-header" style={{ color: "#6673DE" }}>
        Registered Users
      </h2>
      <div
        className={`${
          users.length > 0 ? "user-table-card" : "user-table-card-empty"
        }`}
      >
        {users.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={`http://localhost:5000/${user.profilePicture}`}
                      height={50}
                      width={50}
                      alt={user.name}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.contactInfo}</td>
                  <td className="user-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(user)}
                      style={{marginRight:8}}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <span
              style={{
                fontSize: "18px",
                alignSelf: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              User does not exist
            </span>
          </div>
        )}
        {editingUser && (
          <EditUserForm
            isOpen={isEditModalOpen}
            onRequestClose={handleCloseEdit}
            user={editingUser}
            getUserList={getUserList}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
