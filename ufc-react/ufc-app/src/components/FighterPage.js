import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

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
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {fights.map((fight, index) => (
                  <li
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "1rem",
                      marginBottom: "1rem",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <p><strong>Opponent:</strong> {fight.opponentName}</p>
                    <p><strong>Event:</strong> {fight.event}</p>
                    <p><strong>Location:</strong> {fight.location}</p>
                    <p><strong>Date:</strong> {fight.date}</p>
                    <p><strong>Result:</strong> {fight.result}</p>
                    <p><strong>Pre-Fight Elo:</strong> {fight.fighterPreElo}</p>
                    <p><strong>Post-Fight Elo:</strong> {fight.fighterPostElo}</p>
                    <p><strong>Opponent Elo:</strong> {fight.opponentElo}</p>
                    <p><strong>Weight Class:</strong> {fight.weightClass}</p>
                    <p><strong>Method:</strong> {fight.method}</p>
                    <p><strong>Round:</strong> {fight.round}</p>
                    <p><strong>Time:</strong> {fight.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
  };
  
  export default FighterPage;