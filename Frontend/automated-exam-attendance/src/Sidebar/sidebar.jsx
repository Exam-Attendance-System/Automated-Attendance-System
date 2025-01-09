
import React from 'react';
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Exam Attendance</h2>
      <ul className="sidebar-menu">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/">Exam</a></li>
        <li><a href="/">Students</a></li>
        <li><a href="/">Settings</a></li>
        <li><a href="/">Log out</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
