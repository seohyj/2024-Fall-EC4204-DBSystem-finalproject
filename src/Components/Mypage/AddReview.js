import React, { useState } from "react";
import axios from "axios";

const AddReview = ({ reservationId, onReviewAdded }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 리뷰 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 입력 값 검증
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      setError("Rating must be a number between 1 and 5.");
      return;
    }

    try {
      // 백엔드 API 요청
      const response = await axios.post("http://localhost:5001/api/review", {
        reservation_id: reservationId,
        rating: parseInt(rating, 10),
        comment: comment || null,
      });

      setSuccess(response.data.message);
      setRating("");
      setComment("");

      // 리뷰 추가 후 부모 컴포넌트에 알림
      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add a Review</h2>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Rating (1-5):
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={styles.textarea}
          ></textarea>
        </label>
        <button type="submit" style={styles.button}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "20px auto",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  success: {
    color: "green",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "10px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    padding: "10px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    height: "80px",
  },
  button: {
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default AddReview;
