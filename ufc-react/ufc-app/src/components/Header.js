import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/ufc-logo.png";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="UFC Logo" className="ufc-logo" />
      </Link>
      <p>Elo Tracker</p>
    </div>
  );
};

export default Header;