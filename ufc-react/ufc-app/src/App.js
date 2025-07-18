import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import FighterPage from "./components/FighterPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/fighter/:name" element={<FighterPage />} />
      </Routes>
    </Router>
  );
  
}

export default App;
