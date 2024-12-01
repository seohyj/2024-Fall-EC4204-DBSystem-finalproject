import React, { useEffect } from "react";
import "./welcome.css";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>GIST Room Reservation System</h1>
      <h4>- Who are You? -</h4>
      <div className="welcome-buttons">
        <Link to="/admin">
          <button className="welcome-button">Login as Admin</button>
        </Link>
        <Link to="/user">
          <button className="welcome-button">Login as User</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
