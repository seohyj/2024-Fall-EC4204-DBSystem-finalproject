import React, { useState, useEffect } from "react";
import axios from "axios";

const Reservation = () => {
  const userId = localStorage.getItem("user_id"); // 현재 로그인한 유저 ID
  const [teams, setTeams] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("user");
  const [reservationTimeId, setReservationTimeId] = useState(null);
  const purposes = [
    { id: 1, description: "Meeting" },
    { id: 2, description: "Lecture" },
    { id: 3, description: "Research" },
    { id: 4, description: "Study" },
    { id: 5, description: "Seminar" },
  ];

  // 팀 및 공간 정보 가져오기
  useEffect(() => {
    const fetchTeamsAndSpaces = async () => {
      try {
        const teamsResponse = await axios.get(
          `http://localhost:5001/api/team/${userId}`
        );
        setTeams(teamsResponse.data);

        const spacesResponse = await axios.get(
          `http://localhost:5001/api/reservation/spaces`
        );
        setSpaces(spacesResponse.data);
      } catch (err) {
        console.error("Error fetching teams or spaces:", err);
      }
    };

    fetchTeamsAndSpaces();
  }, [userId]);

  // 선택한 공간과 날짜에 따른 사용 가능한 시간 슬롯 가져오기
  useEffect(() => {
    if (!selectedDate || !selectedSpace) return;

    const fetchAvailableTimes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/reservation/available-times`,
          {
            params: {
              space_id: selectedSpace,
              date: selectedDate,
            },
          }
        );
        setAvailableTimes(response.data);
      } catch (err) {
        console.error("Error fetching available times:", err);
      }
    };

    fetchAvailableTimes();
  }, [selectedDate, selectedSpace]);

  // 예약 시간 생성 핸들러
  const handleCreateReservationTime = async () => {
    const [start_time, end_time] = selectedTimeSlot.split(" - ");
    try {
      console.log("Sending data:", {
        start_time,
        end_time,
        date: selectedDate,
      });
      const response = await axios.post(
        "http://localhost:5001/api/reservation_time",
        {
          start_time,
          end_time,
          date: selectedDate,
        }
      );
      console.log("Response:", response.data);

      if (response.data.success) {
        setReservationTimeId(response.data.reservation_time_id); // 상태 업데이트
        alert("Reservation time created successfully.");
      } else {
        alert("Failed to create reservation time.");
      }
    } catch (err) {
      console.error("Error creating reservation time:", err);
      alert("Error creating reservation time.");
    }
  };

  // 예약 완료 핸들러
  const handleCompleteReservation = async () => {
    if (!reservationTimeId) {
      alert("Please create a reservation time first.");
      return;
    }

    try {
      const reservationData = {
        user_id: selectedTeam === "user" ? userId : null,
        team_id: selectedTeam !== "user" ? selectedTeam : null,
        space_id: selectedSpace,
        reservation_time_id: reservationTimeId,
        purpose_id: selectedPurpose,
      };

      const response = await axios.post(
        "http://localhost:5001/api/reservation",
        reservationData
      );

      if (response.data.success) {
        alert(
          `Reservation created successfully! Reservation ID: ${response.data.reservation_id}`
        );
      } else {
        alert("Failed to create reservation.");
      }
    } catch (err) {
      console.error("Error creating reservation:", err);
      alert("Failed to complete reservation.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Make a Reservation</h1>

      {/* 유저 또는 팀 선택 */}
      <label>
        Reservation for:
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="user">Myself</option>
          {teams.map((team) => (
            <option key={team.team_id} value={team.team_id}>
              {team.team_name}
            </option>
          ))}
        </select>
      </label>

      {/* 날짜 선택 */}
      <label>
        Select Date:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      {/* 공간 선택 */}
      <label>
        Select Space:
        <select
          value={selectedSpace}
          onChange={(e) => setSelectedSpace(e.target.value)}
        >
          <option value="">Select a space</option>
          {spaces.map((space) => (
            <option key={space.space_id} value={space.space_id}>
              {space.name}
            </option>
          ))}
        </select>
      </label>

      {/* 시간 슬롯 선택 */}
      <label>
        Select Time Slot:
        <select
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
        >
          <option value="">Select a time slot</option>
          {availableTimes.map((time) => (
            <option
              key={time.start_time}
              value={`${time.start_time} - ${time.end_time}`}
            >
              {`${time.start_time} - ${time.end_time}`}
            </option>
          ))}
        </select>
      </label>

      {/* 목적 선택 */}
      <label>
        Select Purpose:
        <select
          value={selectedPurpose}
          onChange={(e) => setSelectedPurpose(e.target.value)}
        >
          <option value="">Select a purpose</option>
          {purposes.map((purpose) => (
            <option key={purpose.id} value={purpose.id}>
              {purpose.description}
            </option>
          ))}
        </select>
      </label>

      {/* 버튼 */}
      <button style={styles.button} onClick={handleCreateReservationTime}>
        Create Reservation Time
      </button>
      <button style={styles.button} onClick={handleCompleteReservation}>
        Complete Reservation
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    fontFamily: "Avenir, sans-serif",
    fontSize: "22px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Reservation;
