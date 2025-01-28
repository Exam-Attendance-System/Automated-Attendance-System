// import React from "react";
import Header from "../Header/header"
import Sidebar from "../Sidebar/sidebar";
import "./Student.css";

const students = [
  "Amuzu Mohammed",
  "Ayei Chelsea",
  "Boateng Priscilla",
  "Burton Kim",
  "Danso Yemen",
  "Sarpong Yi",
];

const Student = () => {
  return (
    <div className="student-queue-container">
      <Sidebar />
      <Header />
      <div className="student-queue-page">
        <div className="student-queue">
          <h2 className="queue-title">Student Queue</h2>
          <p className="queue-subtitle">Select a student to begin authentication</p>
          <div className="queue-list">
            {students.map((name) => (
              <div key={name} className="queue-item">
                <span className="queue-name">{name}</span>
                <button className="queue-button">Select</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
