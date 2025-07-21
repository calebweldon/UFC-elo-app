import React from "react";
import FightCard from "./FightCard";
import "../styles/FightHistory.css";

const FightHistory = ({ fights }) => {
  if (!fights || fights.length === 0) return null;

  return (
    <div className="fight-section">
      <h2>Fight History</h2>

      <div className="fight-card-key">
        <div>Result</div>
        <div>Elo (+/-)</div>
        <div>Opponent</div>
        <div>Opponent Elo</div>
      </div>

      <ul className="fight-list">
        {fights.map((fight, index) => (
          <li key={index}>
            <FightCard fight={fight} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FightHistory;