import React, { useState } from "react";
import UserForm from "./Components/UserForm";
import UserList from "./Components/UserList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div style={{ justifyContent: "end", display: "flex" }}>          
          <Routes>
            <Route path="/" Component={UserForm} />
            <Route path="/user-list" Component={UserList} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
