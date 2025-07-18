import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const FighterPage = () => {

    const { name } = useParams();
    const [fighter, setFighter] = useState(null);
  
    const fetchFighter = async () => {
        try {
          const response = await api.get(`/api/fighter/${encodeURIComponent(name)}`);
          setFighter(response.data);
        } catch (err) {
          console.log(err);
        }
    };

    useEffect(() => {
      fetchFighter();
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

      </div>
    );
  };
  
  export default FighterPage;