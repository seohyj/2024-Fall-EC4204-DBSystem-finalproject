import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>🔖 GIST Room Reservation System 🏢</h1>
      <h4>- Welcome 👋, Who are You? -</h4>
      <div className="welcome-buttons">
        <Link to="/user_login">
          <button className="welcome-button">Login as User</button>
        </Link>
        <Link to="/admin_login">
          <button className="welcome-button">Login as Admin</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
