import React, { useEffect, useState } from "react";
import "../styles/FighterTable.css";
import EloToggle from "./EloToggle";
import Pagination from "./Pagination";
import { fetchFightersPage } from "../scripts/FighterTableScripts.js";

const FighterTable = () => {
  const [fighters, setFighters] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [eloView, setEloView] = useState("currentElo");

  useEffect(() => {
    fetchFightersPage(page, eloView, setFighters, setTotalPages);
  }, [page, eloView]);

  return (
    <div className="fighter-table-container">
      <EloToggle eloView={eloView} setEloView={setEloView} />

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

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default FighterTable;