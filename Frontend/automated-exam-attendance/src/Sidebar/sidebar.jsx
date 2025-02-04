import dashboardImg from '../assets/icons8-dashboard-24.png';
import usersImg from '../assets/icons8-users-50.png';
import paperImg from '../assets/icons8-paper-50.png';
import settingsImg from '../assets/icons8-settings-50.png';
import Logout from '../Logout/logout';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    fetch("https://automated-attendance-system.onrender.com/api/user/logout", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({'session_id': sessionStorage.getItem('session_id')}),
    })
    .then((response) => response.json())
    .then((data) => {
    if (data.message === 'Logout successful') {
      sessionStorage.removeItem('session_id');
      navigate("/login");
    } else {
      alert(data.message || "Logout failed. Please check connection and try again");
    }
    })

  }
  return (
    <div className="sidebar">
      <div>
        <h2 className="sidebar-title">Attendance Manager</h2>
        <h6>Attendance Automation System</h6>
      </div>
      <ul className="sidebar-menu">
        <li>
          <a href="/dashboard">
            <img src={dashboardImg} alt="Dashboard" className="sidebar-icon" />
            Dashboard
          </a>
        </li>
        <li>
          <a href="/student">
            <img src={usersImg} alt="Students" className="sidebar-icon" />
            Students
          </a>
        </li>
        <li>
          <a href="/exam">
            <img src={paperImg} alt="Exam" className="sidebar-icon" />
            Exam
          </a>
        </li>
        <li>
          <a href="/settings">
            <img src={settingsImg} alt="Settings" className="sidebar-icon" />
            Settings
          </a>
        </li>
      <div className='logout-div'>
        <button className='log-out-btn' onClick={handleLogout}>
          Log out
        </button>
      </div>
      </ul>
    </div>
  );
}

export default Sidebar;