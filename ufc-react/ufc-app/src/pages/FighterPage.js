import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import EloChart from "../components/EloChart";
import FightHistory from "../components/FightHistory";
import Header from "../components/Header";
import FighterCardHeader from "../components/FighterCardHeader";
import FighterCardEloSection from "../components/FighterCardEloSection";
import "../styles/FighterPage.css";

const FighterPage = () => {
    const { name } = useParams();
    const [fighter, setFighter] = useState(null);
    const [fights, setFights] = useState(null);
    const lastFight = fights?.length > 0 ? fights[fights.length - 1] : null;
    const eloChange = lastFight
      ? (lastFight.fighterPostElo - lastFight.fighterPreElo).toFixed(2)
      : null;
    let eloHistory = [];
  
    
    const fetchFighter = async () => {
      try {
        const response = await api.get(`/api/fighter/${encodeURIComponent(name)}`);
        setFighter(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    const fetchFights = async () => {
      try {
        const response = await api.get(`/api/fights/${encodeURIComponent(name)}`);
        setFights(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      fetchFighter();
      fetchFights();
    }, [name]);

    if (fights) {
      const sortedFights = fights
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
      const firstFightDate = new Date(sortedFights[0].date);
      const oneDayBefore = new Date(firstFightDate);
      oneDayBefore.setDate(oneDayBefore.getDate() - 1);
    
      eloHistory = [
        { date: oneDayBefore.toLocaleDateString(), elo: 1000 },
        ...sortedFights.map(f => ({
          date: new Date(f.date).toLocaleDateString(),
          elo: f.fighterPostElo,
        })),
      ];
    }

    const renderEloArrow = () => {
      if (!lastFight) return null;
    
      switch (lastFight.result) {
        case "win":
          return <span className="elo-arrow up">▲</span>;
        case "loss":
          return <span className="elo-arrow down">▼</span>;
        case "draw":
        case "nc":
        case "no contest":
          return <span className="elo-arrow neutral">−</span>;
        default:
          return null;
      }
    };

    const renderEloChange = () => {
      if (!lastFight || eloChange === null) return null;
    
      let symbol, cls;
    
      if (lastFight.result === "win") {
        symbol = "+";
        cls = "elo-change up";
      } else if (lastFight.result === "loss") {
        symbol = "";
        cls = "elo-change down";
      } else {
        // draw or nc
        symbol = ""
        cls = "elo-change neutral";
        return <span className={cls}>({symbol})</span>;
      }
    
      return <span className={cls}>( {symbol}{eloChange} )</span>;
    };
  
    if (!fighter) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  
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
              renderEloArrow={renderEloArrow}
              renderEloChange={renderEloChange}
            />
            <EloChart eloHistory={eloHistory} eloChange={eloChange} />
          </div>
          <FightHistory fights={fights} />
        </div>
      </div>
    );
  };
  
  export default FighterPage;