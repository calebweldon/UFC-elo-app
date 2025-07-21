import React from "react";

const FighterNameRecord = ({ name, wins, losses, draws, ncs }) => {
  return (
    <div className="fighter-name-record">
      <h1>{name}</h1>
      <p>
        {wins} - {losses} - {draws} ({ncs} NC)
      </p>
    </div>
  );
};

export default FighterNameRecord;