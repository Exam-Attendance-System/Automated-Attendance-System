import dashboardImg from '../assets/icons8-dashboard-24.png';
import usersImg from '../assets/icons8-users-50.png';
import paperImg from '../assets/icons8-paper-50.png';
import settingsImg from '../assets/icons8-settings-50.png';
import './sidebar.css';

function Sidebar() {
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
          <a href="/">
            <img src={usersImg} alt="Students" className="sidebar-icon" />
            Students
          </a>
        </li>
        <li>
          <a href="/Exam">
            <img src={paperImg} alt="Exam" className="sidebar-icon" />
            Exam
          </a>
        </li>
        <li>
          <a href="/Settings">
            <img src={settingsImg} alt="Settings" className="sidebar-icon" />
            Settings
          </a>
        </li>
        <button className='log-out-btn'>
          <a href="/">Log out</a>
        </button>
      </ul>
    </div>
  );
}

export default Sidebar;