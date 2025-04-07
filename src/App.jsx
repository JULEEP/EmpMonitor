import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import AuthForm from "./components/auth";
import ProductivityGrid from "./components/Productivity/ProductivityReport";
import ScreenshotGallery from "./components/Screenshots/ScreenshotsGallery";
import ScreenshotsGrid from "./components/Screenshots/ScreenshotsGallery";
import Summaary from './components/Summary'
import Emp from "./components/emp/emp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/Auth" element={<AuthForm />} />
        <Route path="/productivity" element={<ProductivityGrid />} />
        {/* <Route path="/Auth" element={<AuthForm />} />
        <Route path="/productivity" element={<ProductivityGrid />} /> */}
        <Route path="/screenshots" element={<ScreenshotsGrid />} />{" "}
        <Route path="/summary" element={<Summaary />} />
        <Route path="/emp" element={<Emp />} />

        {/* Add this new route */}
        =======
        {/* ======= */}
        <Route path="/Auth" element={<AuthForm />} />
        <Route path="/productivity" element={<ProductivityGrid />} />
        <Route path="/timesheet" element={<TimeSheet />} />
      </Routes>
    </Router>
  );
}

export default App;
