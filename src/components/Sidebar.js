import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <ul>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/employee">Employee</Link></li>
          <li><Link to="/timesheet">Timesheet</Link></li>
          <li><Link to="/timeclaim">Time Claim</Link></li>
          <li><Link to="/reports">Reports</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </div>
      <div className={`content ${isOpen ? "shifted" : ""}`}>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin panel.</p>
      </div>
    </>
  );
};

export default Sidebar;
