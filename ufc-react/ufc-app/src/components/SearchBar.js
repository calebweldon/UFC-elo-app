import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig';

const SearchBar = () => {
    const [allNames, setAllNames] = useState([]);
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);
  
    const getAllNames = async () => {
        try {
            const response = await api.get("/api/fighters/names");
            setAllNames(response.data);
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getAllNames();
    },[])

    useEffect(() => {
        setFiltered(
          allNames.filter((name) =>
            name.toLowerCase().includes(query.toLowerCase())
          )
        );
    }, [query, allNames]);

    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && query.trim()) {
          navigate(`/fighter/${encodeURIComponent(query.trim())}`);
        }
    };
    
    return (
        <div style={{ position: "relative", maxWidth: "400px", margin: "2rem auto" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search fighters..."
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
    
          {query && filtered.length > 0 && (
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                margin: "0.25rem 0 0 0",
                position: "absolute",
                width: "100%",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {filtered.map((name, index) => (
                <li
                  key={index}
                  style={{
                    padding: "0.5rem",
                    cursor: "pointer",
                  }}
                  onMouseDown={() => setQuery(name)} // mouseDown prevents input blur
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
    );
};

export default SearchBar;