import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// 컴포넌트 임포트
import Welcome from "./Components/welcome.js";
import AdminLogin from "./Components/login/admin_login.js";
import UserLogin from "./Components/login/user_login.js";

function App() {
  return (
    <Router basename="/visual_harmony">
      <Routes>
        {/* 메인 페이지: Welcome */}
        <Route path="/" element={<Welcome />} />
        {/* 비주얼라이저 페이지 */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/user" element={<UserLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
