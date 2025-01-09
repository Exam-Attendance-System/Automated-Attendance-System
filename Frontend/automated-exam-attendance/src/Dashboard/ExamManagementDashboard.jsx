import { useState } from 'react';
import ExamList from './ExamList';
import AttendanceStatus from './AttendanceStatus';
import AddExamModal from './AddExamModal';
import Sidebar from '../Sidebar/sidebar';
import './ExamManagementDashboard.css';

function App() {
  const [exams, setExams] = useState([
    { id: 1, name: "Mini project Exam", date: "2025-01-20", attendees: 30 },
    { id: 2, name: "Software Evolution Exam", date: "2025-01-22", attendees: 25 },
  ]);
  const [showModal, setShowModal] = useState(false);

  const addExam = (exam) => {
    setExams([...exams, { ...exam, id: exams.length + 1 }]);
  };

  return (
    <div className="dashboard-container">
      <div className='side-bar'>
      <Sidebar/>
      </div>
      <div className="dashboard-content">
      <h1>Exam Attendance System Dashboard</h1>
      <button className="add-exam-btn" onClick={() => setShowModal(true)}>Add Exam</button>

      <ExamList exams={exams} />
      <AttendanceStatus exams={exams} />

      {showModal && <AddExamModal addExam={addExam} closeModal={() => setShowModal(false)} />}
      </div>
     
    </div>
  );
}

export default App;
