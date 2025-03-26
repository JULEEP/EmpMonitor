import React from "react";
import Sidebar from "../components/Sidebar"; // Ensure the path is correct

const Admin = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>Admin Dashboard Content</div>
    </div>
  );
};

export default Admin;
