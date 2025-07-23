import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";
import DropdownList from "./DropdownList";
import { getAllNames, getFilteredNames, getMatchedName } from "../scripts/SearchBarScripts.js";

const SearchBar = () => {
  const [allNames, setAllNames] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getAllNames(setAllNames);
  }, []);

  useEffect(() => {
    setFiltered(getFilteredNames(allNames, query));
  }, [query, allNames]);

  const triggerNavigation = () => {
    const match = getMatchedName(allNames, query);

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
        <DropdownList filtered={filtered} onSelect={setQuery} />
      )}
    </div>
  );
};

export default SearchBar;