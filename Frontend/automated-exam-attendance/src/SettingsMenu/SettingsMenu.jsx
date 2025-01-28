import PropTypes from "prop-types";
import "./SettingsMenu.css";
import users from "../assets/icons8-users-50.png";
import authLock from "../assets/authLock.png";
import examConfig from "../assets/examConfig.png";
import notBell from "../assets/notBell.png";
import dataMan from "../assets/dataMan.png";
import sysInteg from "../assets/sysInteg.png";
import secValid from "../assets/secValid.png";
import forwardIcon from "../assets/forwardIcon.png";

const SettingsMenu = ({ activeTab, onTabClick }) => {
  
  // Menu items with paths and icons
  const menuItems = [
    { name: "User Management", icon: users},
    { name: "Authentication settings", icon: authLock},
    { name: "Exam Configuration", icon: examConfig},
    { name: "Notification settings", icon: notBell},
    { name: "Data Management", icon: dataMan},
    { name: "System Integration", icon: sysInteg},
    { name: "Security Settings", icon: secValid},
  ];

  return (
    <div>
      <h2 className="settings-header">Settings</h2>
      <div className="settings-menu card">
        <h3>Settings Menu</h3>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={activeTab === item.name ? "active" : ""}
              onClick={() => onTabClick(item.name)} // Notify parent of the active tab
            >
              <div className="menu-item-content">
                <img src={item.icon} alt={`${item.name} icon`} className="menu-icon" />
                <span>{item.name}</span>
              </div>
              <img src={forwardIcon} alt="forward icon" className="forward-icon" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

SettingsMenu.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired, 
};

export default SettingsMenu;
