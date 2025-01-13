import PropTypes from "prop-types";

function ActivityStatus() {

  // Recent activities array (You can modify or add activities as needed)
  const recentActivities = [
    { activity: "New student registered", time: "3 months ago" },
    { activity: "Exams results uploaded", time: "2 weeks ago" },
    { activity: "Attendance data synced", time: "1 minute ago" },
  ];

  return (
    <div className="attendance-status">
      <h2>Recent Activity</h2>
      <div className="recent-activities">
        <ul style={{ listStyle: "none", padding: 0}}>
          {recentActivities.map((activity, index) => (
            <li key={index} style={{marginBottom: 12 }}>
              <span>{activity.activity} {activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ActivityStatus.propTypes = {
  exams: PropTypes.arrayOf(
    PropTypes.shape({
      attendees: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ActivityStatus;
