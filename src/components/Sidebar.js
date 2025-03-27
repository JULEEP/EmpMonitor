import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaUsers, FaClock, FaFileAlt, FaChartBar, FaCog, FaBars } from "react-icons/fa"; // Added FaUsers
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </button>
        <ul>
          <li>
            <Link to="/admin">
              <FaUser className="icon" />
              <span className="text">Admin</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <FaHome className="icon" />
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/employee">
              <FaUsers className="icon" /> {/* Changed to FaUsers */}
              <span className="text">Employee</span>
            </Link>
          </li>
          {/* Rest unchanged */}
          <li>
            <Link to="/timesheet">
              <FaClock className="icon" />
              <span className="text">Timesheet</span>
            </Link>
          </li>
          <li>
            <Link to="/timeclaim">
              <FaFileAlt className="icon" />
              <span className="text">Time Claim</span>
            </Link>
          </li>
          <li>
            <Link to="/reports">
              <FaChartBar className="icon" />
              <span className="text">Reports</span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FaCog className="icon" />
              <span className="text">Settings</span>
            </Link>
          </li>
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