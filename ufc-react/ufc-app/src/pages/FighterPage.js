import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/FighterPage.css";
import Header from "../components/Header";
import EloChart from "../components/EloChart";
import FightHistory from "../components/FightHistory";
import FighterCardHeader from "../components/FighterCardHeader";
import FighterCardEloSection from "../components/FighterCardEloSection";
import {
  fetchFighterData,
  fetchFightHistory,
  buildEloHistory,
  renderEloArrow,
  renderEloChange
} from "../scripts/FighterPageScripts.js";

const FighterPage = () => {
  const { name } = useParams();
  const [fighter, setFighter] = useState(null);
  const [fights, setFights] = useState(null);

  useEffect(() => {
    fetchFighterData(name, setFighter);
    fetchFightHistory(name, setFights);
  }, [name]);

  if (!fighter) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;

  const lastFight = fights?.length > 0 ? fights[fights.length - 1] : null;
  const eloChange = lastFight
    ? (lastFight.fighterPostElo - lastFight.fighterPreElo).toFixed(2)
    : null;

  const eloHistory = buildEloHistory(fights);

  return (
    <div>
      <Header />
      <div className="fighter-content">
        <div className="fighter-card">
          <FighterCardHeader {...fighter} />
          <FighterCardEloSection
            currentElo={fighter.currentElo}
            peakElo={fighter.peakElo}
            lastFight={lastFight}
            eloChange={eloChange}
            renderEloArrow={() => renderEloArrow(lastFight)}
            renderEloChange={() => renderEloChange(lastFight, eloChange)}
          />
          <EloChart eloHistory={eloHistory} eloChange={eloChange} />
        </div>
        <FightHistory fights={fights} />
      </div>
    </div>
  );
};

export default FighterPage;