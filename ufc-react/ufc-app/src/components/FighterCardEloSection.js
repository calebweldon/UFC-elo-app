import "../styles/FighterCardEloSection.css"


const FighterCardEloSection = ({ currentElo, peakElo, lastFight, renderEloArrow, renderEloChange }) => (
    <div className="fighter-elo">
      <div className="fighter-elo-card">
        <h3 className={`elo-heading ${lastFight?.result === "win" ? "win" : ""}`}>
          Current Elo
        </h3>
        <div className="elo-number-wrapper">
          <div className="elo-value-line">
            <p>{currentElo}</p>
          </div>
          <div className="elo-arrow-group">
            {renderEloArrow()}
            {renderEloChange()}
          </div>
        </div>
      </div>
  
      <div className="fighter-elo-card">
        <h3 className={`elo-heading ${lastFight?.result === "win" ? "win" : ""}`}>
          Peak Elo
        </h3>
        <div className="elo-number-wrapper">
          <div className="elo-value-line">
            <p>{peakElo}</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default FighterCardEloSection;