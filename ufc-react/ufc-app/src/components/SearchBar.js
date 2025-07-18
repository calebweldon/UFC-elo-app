import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig';

const SearchBar = () => {
    const [allNames, setAllNames] = useState([]);
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [isValid, setIsValid] = useState(true);
  
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
        if (e.key === "Enter") {
          const match = allNames.find(
            (name) => name.toLowerCase() === query.trim().toLowerCase()
          );
      
          if (match) {
            setIsValid(true);
            navigate(`/fighter/${encodeURIComponent(match)}`);
          } else {
            setIsValid(false);
          }
        }
      };
    
    return (
        <div style={{ position: "relative", maxWidth: "400px", margin: "2rem auto" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value)
                setIsValid(true)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search fighters..."
            style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                border: isValid ? "1px solid #ccc" : "1px solid red",
                borderRadius: "4px",
                boxShadow: !isValid ? "0 0 0 2px rgba(255, 0, 0, 0.3)" : "none", 
            }}
          />
    
            {!isValid && (
                <p style={{ color: "red", marginTop: "0.25rem", fontSize: "0.9rem" }}>
                    Not a valid fighter name
                </p>
            )}

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