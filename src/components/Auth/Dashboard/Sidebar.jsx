import React from "react";
import './Dashboard.css';

function Sidebar({ openAddModal }) {
  return (
    <div className="sidebar">
      <button className="sidebar-link">Dashboard</button>
      <button className="sidebar-link" onClick={openAddModal}>
        Add Employee
      </button>
    </div>
  );
}

export default Sidebar;
