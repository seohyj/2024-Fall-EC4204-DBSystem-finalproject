import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Components/welcome.js"; // before login, first default page
import AdminLogin from "./Components/login/AdminLogin.js";
import UserLogin from "./Components/login/UserLogin.js";
import MainPage from "./Components/MainPage.js";
import MyPage from "./Components/MyPage.js";
import Reservation from "./Components/menu/reservation.js";
import ImgSearch from "./Components/menu/ImageSearch.js";
import TextSearch from "./Components/menu/TextSearch.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 페이지 */}
        <Route path="/" element={<Welcome />} />
        <Route path="/user_login" element={<UserLogin />} />
        <Route path="/admin_login" element={<AdminLogin />} />

        {/* User 로그인 후 페이지 */}
        <Route path="/user_login/main" element={<MainPage />} />
        <Route path="/user_login/mypage" element={<MyPage />} />
        <Route path="/user_login/reservation" element={<Reservation />} />
        <Route path="/user_login/img_search" element={<ImgSearch />} />
        <Route path="/user_login/text_search" element={<TextSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
