import {useNavigate} from 'react-router-dom'
import "./Student.css";

const students = [
  "Amuzu Mohammed",
  "Ayei Chelsea",
  "Boateng Priscilla",
  "Burton Kim",
  "Danso Yemen",
  "Sarpong Yi",
];

const Student = () => {
  const navigate = useNavigate();

  const handleNavigate =(name)=>{
    navigate("/Exam", {state: {studentName: name}});
  };
  return (
    <div className="student-queue-container">
      <h2 className="stu-header">Student</h2>
      <div className="student-queue-page">
        <div className="student-queue">
          <h2 className="queue-title">Student Queue</h2>
          <p className="queue-subtitle">Select a student to begin authentication</p>
          <div className="queue-list">
            {students.map((name) => (
              <div key={name} className="queue-item">
                <span className="queue-name">{name}</span>
                <button className="queue-button" onClick={()=>handleNavigate(name)}>Select</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
