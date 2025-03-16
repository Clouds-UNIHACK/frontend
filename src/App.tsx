import NavBar from "./components/NavBar";
import Root from "./components/Root";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SwappingPage } from "./pages/SwappingPage";
import { WhoWeArePage } from "./pages/WhoWeArePage";
import { MyProfilePage } from "./pages/MyProfilePage";
import { RecommendedShopsPage } from "./pages/RecommendedShopsPage";
import GalleryPage from "./pages/GalleryPage";

function App() {
  return (
    <Router>
      <Root>
        <NavBar />

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<SwappingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/whoweare" element={<WhoWeArePage />} />
          <Route path="/myprofile" element={<MyProfilePage />} />
          <Route path="/rec-shops" element={<RecommendedShopsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<SwappingPage />} /> {/* 404 Page */}
        </Routes>
      </Root>
    </Router>
  );
}

export default App;
