import React, { useState } from "react";
import axios from "axios";

const Login = ({ title }) => {
  const [user_id, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!user_id) {
      setError("You must enter your ID to login.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/user", {
        user_id,
      });

      if (response.data.success) {
        // Save user data to localStorage
        localStorage.setItem("user_name", response.data.user_name);
        localStorage.setItem("user_id", user_id);
        setSuccess(response.data.message);

        // Redirect to MainPage
        window.location.href = "/user_login/main";
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server connection failed.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{title}</h1>
      <input
        type="text"
        placeholder="ID"
        value={user_id}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  input: {
    width: "200px",
    padding: "10px",
    marginBottom: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    width: "100px",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2a4461",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "1rem",
  },
  success: {
    color: "green",
    marginTop: "1rem",
  },
};

export default Login;
