import { useLocation } from "react-router-dom";
import { useState } from "react";
import UGlogo from "../assets/UGlogo.png";
import "./header.css";

function Header() {
  const location = useLocation();
  const [department, setDepartment] = useState("Physics");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const departments = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Computer Science",
    "Law",
    "Sociology",
    "Business",
  ];

  // Get email from location state or default to empty
  const email = location.state?.email || "";

  // Extract the first letter of the email
  const profileInitial = email.charAt(0).toUpperCase();

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={UGlogo} alt="UG Logo" />
      </div>
      <div className="header-right">
        {/* Department Selection Dropdown */}
        <div className="department-select">
          <select value={department} onChange={handleDepartmentChange}>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications Bell */}
        <div className="notifications">
          <button
            className="notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
          </button>
          {showNotifications && (
            <div className="notifications-dropdown">
              <p>No new notifications</p>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="user-profile">
          <button
            className="profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="profile-pic">
              {profileInitial || "?"}
            </div>
          </button>
          {showProfileMenu && (
            <div className="profile-menu">
              <ul>
                <li>View Profile</li>
                <li><a href="/Settings">Settings</a></li>
                <li><a href="/">Logout</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
