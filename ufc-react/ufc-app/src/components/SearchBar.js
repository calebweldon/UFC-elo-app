import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig';
import "../styles/SearchBar.css";

const SearchBar = () => {
    const [allNames, setAllNames] = useState([]);
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [isValid, setIsValid] = useState(true);
  
    const navigate = useNavigate();
  
    const getAllNames = async () => {
      try {
        const response = await api.get("/api/fighters/names");
        setAllNames(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getAllNames();
    }, []);
  
    useEffect(() => {
      setFiltered(
        allNames.filter((name) =>
          name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, [query, allNames]);
  
    const triggerNavigation = () => {
      const match = allNames.find(
        (name) => name.toLowerCase() === query.trim().toLowerCase()
      );
  
      if (match) {
        setIsValid(true);
        navigate(`/fighter/${encodeURIComponent(match)}`);
      } else {
        setIsValid(false);
      }
    };
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        triggerNavigation();
      }
    };
  
    return (
      <div className="search-container">
        <div className="search-input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsValid(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search fighters..."
            className={`search-input ${isValid ? "" : "invalid"}`}
          />
          <button
            onClick={triggerNavigation}
            className={`search-button ${isValid ? "" : "invalid"}`}
          >
            →
          </button>
        </div>
  
        {!isValid && <p className="error-message">Not a valid fighter name</p>}
  
        {query && filtered.length > 0 && (
          <ul className="dropdown-list">
            {filtered.map((name, index) => (
              <li key={index} onMouseDown={() => setQuery(name)}>
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default SearchBar;