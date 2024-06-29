import React, { useEffect, useState } from "react";
import UserForm from "./Components/UserForm";
import UserList from "./Components/UserList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./Components/LoginForm";

function App() {
  const [user, setUser] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    setUser(token);
  }, []);
  const handleLoginSuccess = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      {user ? (
        <Router>
          <div style={{ justifyContent: "end", display: "flex" }}>
            <Routes>
              <Route path="/" element={<UserList setUser={setUser}/>} />
              <Route
                path="/user-list"
                element={<UserList setUser={setUser} />}
              />
            </Routes>
          </div>
        </Router>
      ) : (
        <Router>
          <div style={{ justifyContent: "end", display: "flex" }}>
            <Routes>
              <Route path="/" element={<UserForm />} />
              <Route
                path="/user-login"
                element={<LoginForm setUser={setUser} />}
              />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
