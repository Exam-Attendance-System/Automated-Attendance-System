

function AttendanceStatus({ exams }) {
  const totalExams = exams.length;
  const totalAttendees = exams.reduce((total, exam) => total + exam.attendees, 0);

  return (
    <div className="attendance-status">
      <h2>Attendance Summary</h2>
      <p>Total Exams: {totalExams}</p>
      <p>Total Attendees: {totalAttendees}</p>
    </div>
  );
}

export default AttendanceStatus;


import PropTypes from "prop-types";

AttendanceStatus.propTypes = {
  exams: PropTypes.arrayOf(
    PropTypes.shape({
      attendees: PropTypes.number.isRequired,
    })
  ).isRequired,
};
