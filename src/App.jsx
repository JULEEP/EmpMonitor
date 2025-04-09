import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import AuthForm from "./components/auth";
import ProductivityGrid from "./components/Productivity/ProductivityReport"
import ScreenshotsGrid from "./components/Screenshots/ScreenshotsGallery";
import Summaary from "./components/Summary";
import Emp from "./components/emp/emp";

import Dashboard from "./components/Dashboard/Dashboard";
import EmployeeForm from "./components/Employee/auth/EmployeeForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
      <Route path="/auth" element={<EmployeeForm />} />
        <Route path="/Auth" element={<AuthForm />} />
        <Route path="/productivity" element={<ProductivityGrid />} />
        {/* <Route path="/Auth" element={<AuthForm />} />
        <Route path="/productivity" element={<ProductivityGrid />} /> */}
        <Route path="/screenshots" element={<ScreenshotsGrid />} />{" "}
        <Route path="/summary" element={<Summaary />} />
        <Route path="/emp" element={<Emp />} />
<<<<<<< HEAD
        <Route path="/timesheet" element={<TimesheetPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
=======

        {/* Add this new route */}
        {/* ======= */}
        {/* ======= */}
        <Route path="/Auth" element={<AuthForm />} />
        <Route path="/productivity" element={<ProductivityGrid />} />
        <Route path="/timesheet" element={<TimeSheet />} />
>>>>>>> 3a047e455eeded89abc5e9db9fe6009d0a6aca61
      </Routes>
    </Router>
  );
}

export default App;
