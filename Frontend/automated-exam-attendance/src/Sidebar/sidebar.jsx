
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div>
        <h2 className="sidebar-title">Attendance Manager</h2>
        <h6>Attendance Automation System</h6>
      </div>
      <ul className="sidebar-menu">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/Exam">Exam</a></li>
        <li><a href="/">Students</a></li>
        <li><a href="/Settings">Settings</a></li>
        <button className='log-out-btn'><a href="/">Log out</a></button>
      </ul>
    </div>
  );
}

export default Sidebar;
