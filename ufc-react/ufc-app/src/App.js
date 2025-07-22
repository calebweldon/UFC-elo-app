import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import FighterPage from "./components/FighterPage";
import Header from "./components/Header";
import PageNotFoundPage from "./components/PageNotFoundPage";
import ErrorBoundary from "./ErrorBoundary";


function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fighter/:name" element={<FighterPage />} />
          <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
