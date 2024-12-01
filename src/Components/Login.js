import React, { useState } from "react";
import axios from "axios";

const Login = ({ title }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!username) {
      setError("You must enter your ID to login.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          username,
        }
      );

      setSuccess(response.data.message);
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
        value={username}
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
