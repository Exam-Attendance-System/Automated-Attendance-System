import { format } from "date-fns";
import PropTypes from "prop-types";

function ExamList({ exams }) {
  return (
    <div className="exam-list">
      <h2>Upcoming Exams</h2>
      <table>
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Exam Date</th>
            <th>Time</th>
            
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.name}</td>
              <td>{format(new Date(exam.date), "MMM d, yyyy")}</td>
              <td>{exam.time}</td> {/* Display exam time */}
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ExamList.propTypes = {
  exams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired, // New field for exam time
      
    })
  ).isRequired,
};

export default ExamList;
