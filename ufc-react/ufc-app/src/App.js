import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import FighterPage from "./components/FighterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fighter/:name" element={<FighterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
