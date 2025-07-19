import React from "react";
import { useState } from "react";
import "../styles/FightCard.css";


const FightCard = ({ fight }) => {
    const [expanded, setExpanded] = useState(false);
  
    const eloDiff = fight.fighterPostElo - fight.fighterPreElo;
    const formattedDiff = eloDiff >= 0 ? `+${eloDiff.toFixed(2)}` : eloDiff.toFixed(2);
    const resultClass = fight.result.toLowerCase();
  
    return (
      <div className="fight-card" onClick={() => setExpanded(!expanded)}>
        <div className="fight-meta">
          {fight.event} | {fight.date}
        </div>
  
        <div className="fight-row">
          <div className={`fight-result ${resultClass}`}>{fight.result}</div>
          <div className="fighter-elo">{fight.fighterPostElo} ({formattedDiff})</div>
          <div className="opponent-name">{fight.opponentName}</div>
          <div className="opponent-elo">{fight.opponentElo}</div>
        </div>
  
        {expanded && (
          <div className="fight-details">
            <p><strong>Weight Class:</strong> {fight.weightClass}</p>
            <p><strong>Method:</strong> {fight.method}</p>
            <p><strong>Round:</strong> {fight.round}</p>
            <p><strong>Time:</strong> {fight.time}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default FightCard;