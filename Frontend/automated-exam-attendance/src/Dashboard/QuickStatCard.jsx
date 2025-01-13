
import PropTypes from 'prop-types';
import './QuickStats.css';
import calender from '../assets/icons8-calendar-24.png'
import users from '../assets/icons8-users-50.png'
import settings from '../assets/icons8-settings-50.png'

function QuickStatsContainer() {
  const stats = [
    { title: 'Total Exams', value: 120, icon: calender, color: '#E0CB90' },
    { title: 'Registered Students', value: 560, icon: users, color: '#E0CB90' },
    { title: 'Attendance Rate', value: '95%', icon: users, color: '#E0CB90' },
    { title: 'Data Sync Status', value: 'Synced', icon:settings , color: '#E0CB90' },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <QuickStatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}

function QuickStatCard({ title, value, icon, color }) {
  const isSynced = value === 'Synced';
  return (
    <div className="quick-stat-card" style={{ borderColor: "#fff" }}>
      <div className="icon" style={{ backgroundColor: color }}>
      <img src={icon} alt={`${title} icon`} />
      </div>
      <div className="details">
        <h3>{title}</h3>
        <p style={{color: isSynced ? 'green' : 'inherit'}}>{value}</p>
      </div>
    </div>
  );
}

// Add PropTypes for validation
QuickStatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default QuickStatsContainer;
