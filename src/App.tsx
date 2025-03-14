import NavBar from "./components/NavBar";
import Root from "./components/Root";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Root>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="*" element={<HomePage />} /> {/* 404 Page */}
        </Routes>
      </Router>
    </Root>
  );
}

export default App;
