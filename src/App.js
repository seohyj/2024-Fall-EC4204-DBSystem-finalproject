import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Components/welcome.js";
import AdminLogin from "./Components/login/AdminLogin.js";
import UserLogin from "./Components/login/UserLogin.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/user_login" element={<UserLogin />} />
        <Route path="/admin_login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
