import React from "react";
import SearchBar from "./SearchBar";
import FighterTable from "./FighterTable";
import Header from "./Header";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <SearchBar />
      <FighterTable />
    </div>
  );
};

export default HomePage;