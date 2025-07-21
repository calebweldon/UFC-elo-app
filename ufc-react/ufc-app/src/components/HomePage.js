import React from "react";
import SearchBar from "./SearchBar";
import FighterTable from "./FighterTable";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <SearchBar />
      <FighterTable />
    </div>
  );
};

export default HomePage;