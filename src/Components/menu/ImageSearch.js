import React, { useState } from "react";
import axios from "axios";

const ImageSearch = () => {
  const [userText, setUserText] = useState(""); // 유저 입력 텍스트
  const [results, setResults] = useState([]); // 검색 결과
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지

  const handleSearch = async () => {
    if (!userText.trim()) {
      alert("Please enter a description.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5001/api/search", {
        queryText: userText,
      });

      setResults(response.data);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Room Search</h1>
      <input
        type="text"
        placeholder="What kind of room are you looking for?"
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.resultsContainer}>
        {results.map((result, index) => {
          const cleanedPath = result.image_path.replace("./images/", ""); // './images/' 제거
          return (
            <div key={index} style={styles.resultCard}>
              <h2 style={styles.spaceName}>{result.space_name}</h2>
              <img
                src={require(`../images/${cleanedPath}`).default} // 경로 수정
                alt={result.space_name}
                style={styles.image}
              />
              <p style={styles.similarity}>
                Similarity: {result.similarity.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Avenir, sans-serif",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007BFF",
    color: "#FFF",
    cursor: "pointer",
  },
  resultsContainer: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  resultCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  spaceName: {
    fontSize: "1.25rem",
    marginBottom: "10px",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "5px",
    objectFit: "cover",
  },
  similarity: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#666",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default ImageSearch;
