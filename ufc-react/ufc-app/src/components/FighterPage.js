import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import api from "../api/axiosConfig";
import FightCard from "./FightCard";
import "../styles/FighterPage.css";

const FighterPage = () => {
    const { name } = useParams();
    const [fighter, setFighter] = useState(null);
    const [fights, setFights] = useState(null);
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
  
    if (!fighter) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  
    return (
      <div className="fighter-page-container">
        <div className="fighter-content">
          <h1>{fighter.name}</h1>
    
          <p><strong>Current Elo:</strong> {fighter.currentElo}</p>
          <p><strong>Peak Elo:</strong> {fighter.peakElo}</p>
          <p><strong>Wins:</strong> {fighter.wins}</p>
          <p><strong>Losses:</strong> {fighter.losses}</p>
          <p><strong>Draws:</strong> {fighter.draws}</p>
          <p><strong>No Contests:</strong> {fighter.ncs}</p>
    
          {eloHistory.length > 0 && (
            <div className="elo-chart-container">
              <h2>ELO Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={eloHistory}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip />
                  <Line type="monotone" dataKey="elo" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {fights && (
            <div className="fight-section">
              <h2>Fight History</h2>
    
              <div className="fight-card-key">
                <div className="fight-card-item">Result</div>
                <div className="fight-card-item">Elo (+/-)</div>
                <div className="fight-card-item">Opponent</div>
                <div className="fight-card-item">Opponent Elo</div>
              </div>
    
              <ul className="fight-list">
                {fights.map((fight, index) => (
                  <li key={index}>
                    <FightCard fight={fight} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default FighterPage;