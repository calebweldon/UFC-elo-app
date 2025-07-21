import React from "react";
import "../styles/DropdownList.css";

const DropdownList = ({ filtered, onSelect }) => {
  return (
    <ul className="dropdown-list">
      {filtered.map((name, index) => (
        <li key={index} onMouseDown={() => onSelect(name)}>
          {name}
        </li>
      ))}
    </ul>
  );
};

export default DropdownList;