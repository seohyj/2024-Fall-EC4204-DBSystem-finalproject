import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  // Retrieve user data from localStorage
  const userName = localStorage.getItem("user_name") || "Guest";

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headertext}>
          <h1>Welcome, {userName}</h1>
        </div>
        <Link to="/user_login/mypage">
          <button style={styles.headerbutton}>My Page</button>
        </Link>
      </header>

      {/* Body */}
      <div style={styles.body}>
        <Link to="/user_login/img_search">
          <button style={styles.button}>
            Image-based AI Recommendation for your Reservation
          </button>
        </Link>
        <Link to="/user_login/text_search">
          <button style={styles.button}>
            Text-based AI Recommendation for your Reservation
          </button>
        </Link>
        <Link to="/user_login/reservation">
          <button style={styles.button}>Make Reservation</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "10px",
    backgroundColor: "#f7f7f7",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  headertext: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: "5px 40px",
    backgroundColor: "transparent",
  },
  headerbutton: {
    width: "150px",
    marginRight: "40px",
    padding: "15px 30px",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#6282a5",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  userIcon: {
    width: "40px",
    height: "40px",
    cursor: "pointer",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
    marginTop: "50px",
  },
  button: {
    padding: "15px 30px",
    width: "800px",
    fontSize: "1.4rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#6282a5",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default MainPage;
