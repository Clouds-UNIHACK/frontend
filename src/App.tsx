import NavBar from "./components/NavBar";
import Root from "./components/Root";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SwappingPage } from "./pages/SwappingPage";
import { WhoWeArePage } from "./pages/WhoWeArePage";
import { MyProfilePage } from "./pages/MyProfilePage";
import { RecommendedShopsPage } from "./pages/RecommendedShopsPage";

function App() {
  return (
    <Root>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/swapping" element={<SwappingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/whoweare" element={<WhoWeArePage />} />
          <Route path="/myprofile" element={<MyProfilePage />} />
          <Route path="/rec-shops" element={<RecommendedShopsPage />} />
          <Route path="*" element={<HomePage />} /> {/* 404 Page */}
        </Routes>
      </Router>
    </Root>
  );
}

export default App;
