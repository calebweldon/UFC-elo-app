import React from "react";
import "../styles/EloToggle.css";

const EloToggle = ({ eloView, setEloView }) => {
  return (
    <div className="elo-toggle">
      <button
        className={eloView === "currentElo" ? "active" : ""}
        onClick={() => setEloView("currentElo")}
      >
        Current Elo
      </button>
      <button
        className={eloView === "peakElo" ? "active" : ""}
        onClick={() => setEloView("peakElo")}
      >
        Peak Elo
      </button>
    </div>
  );
};

export default EloToggle;