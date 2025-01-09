
import { format } from "date-fns";

function ExamList({ exams }) {
  return (
    <div className="exam-list">
      <h2>Upcoming Exams</h2>
      <table>
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Exam Date</th>
            <th>Attendees</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.name}</td>
              <td>{format(new Date(exam.date), "MMM d, yyyy")}</td>
              <td>{exam.attendees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExamList;


import PropTypes from 'prop-types';

ExamList.propTypes = {
  exams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      attendees: PropTypes.number.isRequired,
    })
  ).isRequired,
};
