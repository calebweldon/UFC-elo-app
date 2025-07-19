import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import FightCard from "./FightCard";

const FighterPage = () => {
    const { name } = useParams();
    const [fighter, setFighter] = useState(null);
    const [fights, setFights] = useState(null);
  
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
  
    if (!fighter) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  
    return (
      <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h1>{fighter.name}</h1>
  
        <p><strong>Current Elo:</strong> {fighter.currentElo}</p>
        <p><strong>Peak Elo:</strong> {fighter.peakElo}</p>
        <p><strong>Wins:</strong> {fighter.wins}</p>
        <p><strong>Losses:</strong> {fighter.losses}</p>
        <p><strong>Draws:</strong> {fighter.draws}</p>
        <p><strong>No Contests:</strong> {fighter.ncs}</p>
  
        {fights && (
          <div style={{ marginTop: "2rem" }}>
            <h2>Fight History</h2>

            <div className="fight-card-key">
              <div className="fight-card-item">Result</div>
              <div className="fight-card-item">Elo (+/-)</div>
              <div className="fight-card-item">Opponent</div>
              <div className="fight-card-item">Opponent Elo</div>
            </div>

            <ul style={{ listStyleType: "none", padding: 0 }}>
              {fights.map((fight, index) => (
                <li key={index}>
                  <FightCard fight={fight} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default FighterPage;