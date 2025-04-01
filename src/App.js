import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import AuthForm from "./components/auth";
import ProductivityGrid from "./components/Productivity/ProductivityReport";
import Emp from "./components/emp/emp";
import TimesheetPage from "./components/timesheet/timesheet";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/Auth" element={< AuthForm/>} />
        <Route path="/productivity" element={< ProductivityGrid/>} />
        <Route path="/emp" element={< Emp/>} />
        <Route path="/timesheet" element={< TimesheetPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
