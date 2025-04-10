import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import AuthForm from "./components/auth";
import ProductivityGrid from "./components/Productivity/ProductivityReport";
import Summary from "./components/Summary";
import Detailedview from "./components/Detailedview";
import TimeSheet from "./components/timesheet/timesheet";
import Dashboard from "./components/Dashboard/Dashboard";
import EmployeeForm from "./components/Employee/auth/EmployeeForm";
// =======

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/Auth" element={< AuthForm/>} />
        <Route path="/productivity" element={< ProductivityGrid/>} />
        <Route path="/summary" element={< Summary/>} />
        <Route path="/detailedview" element={< Detailedview/>} />
        <Route path="/timesheet" element={< TimeSheet />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/eAuth" element={<EmployeeForm />} />
     
=======
{/* >>>>>>> Stashed changes */}
      </Routes>
    </Router>
  );
}

export default App;
