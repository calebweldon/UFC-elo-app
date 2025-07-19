import React from "react";
import SearchBar from "./SearchBar";
import FighterTable from "./FighterTable";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      {/* <h1>UFC ELO Tracker</h1> */}
      <SearchBar />
      <FighterTable />
    </div>
  );
};

export default HomePage;