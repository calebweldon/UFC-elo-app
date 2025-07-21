import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import "../styles/FighterTable.css";

const FighterTable = () => {
  const [fighters, setFighters] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [eloView, setEloView] = useState("currentElo");

  const fetchFighters = async () => {
    try {
      const response = await api.get("/api/fighters/page", {
        params: {
          page,
          size: 20,
          sortBy: eloView,
        },
      });
      setFighters(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFighters();
  }, [page, eloView]);

  return (
    
    <div className="fighter-table-container">

    <div className="elo-toggle">
        <button
            className={eloView === "currentElo" ? "active" : ""}
            onClick={() => setEloView("currentElo")}
        >
        Current Elo
        </button>
        <button
            className={eloView === "peakElo" ? "active" : ""}
            onClick={() => setEloView("peakElo")}
        >
        Peak Elo
        </button>
    </div>
      
      <table className="fighter-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>{eloView === "currentElo" ? "Current Elo" : "Peak Elo"}</th>
            <th>Record</th>
          </tr>
        </thead>
        <tbody>
          {fighters.map((fighter, index) => (
            <tr key={fighter.id}>
              <td>{page * 20 + index + 1}</td>
              <td>
                <a href={`/fighter/${encodeURIComponent(fighter.name)}`} className="fighter-link">
                  {fighter.name}
                </a>
              </td>
              <td>{eloView === "currentElo" ? fighter.currentElo : fighter.peakElo}</td>
              <td>{fighter.wins}-{fighter.losses}-{fighter.draws} ({fighter.ncs} NC)</td>
            </tr>
          ))}
      </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page + 1} of {totalPages}</span>
        <button disabled={page + 1 === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default FighterTable;