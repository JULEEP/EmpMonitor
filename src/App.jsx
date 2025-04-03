import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import AuthForm from "./components/auth";
import ProductivityGrid from "./components/Productivity/ProductivityReport";
import ScreenshotGallery from "./components/Screenshots/ScreenshotsGallery";
import ScreenshotsGrid from "./components/Screenshots/ScreenshotsGallery";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/Auth" element={<AuthForm />} />
        <Route path="/productivity" element={<ProductivityGrid />} />
        <Route path="/screenshots" element={<ScreenshotsGrid />} /> {/* Add this new route */}
      </Routes>
    </Router>
  );
}

export default App;