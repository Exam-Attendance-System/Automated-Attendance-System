import { useState } from 'react';
// import Header from '../Header/header';
import ExamList from './ExamList';
import ActivityStatus from './ActivityStatus';
import AddExamModal from './AddExamModal';
// import Sidebar from '../Sidebar/sidebar';
import QuickStatCard from '../Dashboard/QuickStatCard';
import IntegrationStatus from "../Dashboard/IntergrationStatus"
import AttendanceAutomation from "../Dashboard/AttendanceAutomation"
import './ExamManagementDashboard.css';

function App() {
  const [exams, setExams] = useState([
    { id: 1, name: "DCIT307 Mini project", date: "2025-01-20", time: "1:30pm" },
    { id: 2, name: "DCIT321 Software Evolution", date: "2025-01-22", time: "3:30pm" },
  ]);
  const [showModal, setShowModal] = useState(false);

  const addExam = (exam) => {
    setExams([...exams, { ...exam, id: exams.length + 1 }]);
  };

  return (
<>
    <div className="dashboard-container">
     
      <div className="dashboard-content">
      <div className='title-button'>
      <h1>Dashboard</h1>
      <button className="add-exam-btn" onClick={() => setShowModal(true)}>Add Exam</button>
      </div>
      <QuickStatCard/>

      <div className='Exam-Activity'>
      <ExamList exams={exams} />
      <ActivityStatus exams={exams} />
      </div>
    
      {showModal && <AddExamModal addExam={addExam} closeModal={() => setShowModal(false)} />}
        <IntegrationStatus/>
        <AttendanceAutomation/>
      </div>
    </div>
    </>
  );
}

export default App;
