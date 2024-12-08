import React, { useState, useEffect } from "react";
import axios from "axios";

const MyPage = () => {
  const [reservations, setReservations] = useState([]);
  const [recentReservation, setRecentReservation] = useState(null);
  const [teamInfo, setTeamInfo] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const userId = localStorage.getItem("user_id"); // 로그인된 유저 ID

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // 팀 정보를 보기 좋게 파싱하는 함수
  const formatTeamMembers = (membersString) => {
    if (!membersString) return "";
    return membersString.split(",").join(", ");
  };

  // Fetch user-specific data
  useEffect(() => {
    // Fetch all reservations
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/reservation/${userId}`
        );
        setReservations(response.data);

        // Calculate total fee
        const total = response.data.reduce((sum, reservation) => {
          const cost = parseFloat(reservation.cost) || 0;
          return sum + cost;
        }, 0);
        setTotalFee(total);

        if (response.data.length > 0) {
          setRecentReservation(response.data[0]);
        }
      } catch (err) {
        console.error("Error fetching reservations:", err);
      }
    };

    // Fetch team info
    const fetchTeamInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/team/${userId}`
        );
        setTeamInfo(response.data);
      } catch (err) {
        console.error("Error fetching team info:", err);
      }
    };

    fetchReservations();
    fetchTeamInfo();
  }, [userId]);

  // Handle adding a review for the recent reservation
  const handleAddReview = async () => {
    if (!recentReservation) return;

    try {
      const reviewData = {
        reservation_id: recentReservation.reservation_id,
        rating: 5, // Example rating
        comment: "Great experience!", // Example comment
      };

      await axios.post("http://localhost:5001/api/review", reviewData);
      alert("Review added successfully!");
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Page</h1>

      {/* 월별 예약 조회 */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Monthly Reservations</h2>
        {reservations.length === 0 ? (
          <p style={styles.text}>No reservations found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Space</th>
                <th style={styles.tableHeader}>Cost</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.reservation_id} style={styles.tableRow}>
                  <td style={styles.tableCell}>
                    {formatDate(reservation.date)}
                  </td>
                  <td style={styles.tableCell}>{reservation.space_name}</td>
                  <td style={styles.tableCell}>${reservation.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* 최근 예약 및 사용 조회 */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Recent Reservation</h2>
        {recentReservation ? (
          <div style={styles.card}>
            <p>
              <strong>Space:</strong> {recentReservation.space_name}
            </p>
            <p>
              <strong>Date:</strong> {formatDateTime(recentReservation.date)}
            </p>
            <p>
              <strong>Cost:</strong> ${recentReservation.cost}
            </p>
            <button style={styles.button} onClick={handleAddReview}>
              Add Review
            </button>
          </div>
        ) : (
          <p style={styles.text}>No recent reservations.</p>
        )}
      </section>

      {/* 팀 등록 */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Team Information</h2>
        {teamInfo.length === 0 ? (
          <p style={styles.text}>You are not part of any team.</p>
        ) : (
          <div>
            {teamInfo.map((team) => (
              <div key={team.team_id} style={styles.card}>
                <p>
                  <strong>Team Name:</strong> {team.team_name}
                </p>
                <p>
                  <strong>Members:</strong>{" "}
                  {formatTeamMembers(team.team_members)}
                </p>
              </div>
            ))}
          </div>
        )}
        <button
          style={styles.button}
          onClick={() => alert("Team registration feature coming soon!")}
        >
          Register a Team
        </button>
      </section>

      {/* 총 비용 계산 */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Total Fee</h2>
        <p style={styles.text}>
          Your total reservation cost so far: ${totalFee}
        </p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Avenir, sans-serif",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "#333",
  },
  section: {
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  text: {
    fontSize: "1.2rem",
    color: "black",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  tableHeader: {
    textAlign: "left",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    borderBottom: "2px solid #ddd",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s",
  },
  tableCell: {
    padding: "10px",
    textAlign: "left",
  },
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  list: {
    padding: "10px",
    listStyleType: "disc",
    marginLeft: "20px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default MyPage;
