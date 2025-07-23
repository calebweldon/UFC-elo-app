import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FighterPage from "./pages/FighterPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
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
