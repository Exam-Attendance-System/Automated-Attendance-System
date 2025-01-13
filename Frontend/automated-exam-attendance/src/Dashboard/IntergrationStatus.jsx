
import PropTypes from "prop-types";
import "./IntegrationStatus.css"

function ProgressDashboard() {
  const progressData = [
    { label: "Student Records", percentage: 75, color: "#4CAF50" },
    { label: "Exam Schedule", percentage: 60, color: "#2196F3" },
    { label: "Attendance Data", percentage: 90, color: "#FFC107" },
  ];

  return (
    <div className="progress-dashboard">
      <h2>Integration Status</h2>
      {progressData.map((item, index) => (
        <ProgressBar
          key={index}
          label={item.label}
          percentage={item.percentage}
          color={item.color}
        />
      ))}
    </div>
  );
}

function ProgressBar({ label, percentage, color }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-label">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default ProgressDashboard;
