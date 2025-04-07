import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import AuthForm from "./components/auth";
import ProductivityGrid from "./components/Productivity/ProductivityReport";

import ScreenshotsGrid from "./components/Screenshots/ScreenshotsGallery";

import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/Auth" element={<AuthForm />} />
        <Route path="/productivity" element={<ProductivityGrid />} />
        <Route path="/screenshots" element={<ScreenshotsGrid />} />{" "}
        {/* Add this new route */}
        
        <Route path="/Auth" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
                    
      </Routes>
    </Router>
  );
}

export default App;
