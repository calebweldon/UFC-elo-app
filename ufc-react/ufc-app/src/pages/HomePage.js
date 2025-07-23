import React from "react";
import SearchBar from "../components/SearchBar";
import FighterTable from "../components/FighterTable";
import Header from "../components/Header";
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