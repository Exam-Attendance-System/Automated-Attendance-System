import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

function AddExamModal({ addExam, closeModal }) {
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState(''); // Replacing attendees with examTime

  const handleSubmit = () => {
    addExam({ name: examName, date: examDate, time: examTime }); // Submit with examTime
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Exam</h2>
        <input 
          type="text" 
          placeholder="Exam Name" 
          value={examName} 
          onChange={(e) => setExamName(e.target.value)} 
        />
        <input 
          type="date" 
          value={examDate} 
          onChange={(e) => setExamDate(e.target.value)} 
        />
        <input 
          type="time"  // Use type="time" for selecting the time
          value={examTime} 
          onChange={(e) => setExamTime(e.target.value)} 
        />
        <div>
          <button onClick={handleSubmit}>Add Exam</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// Define PropTypes for props validation
AddExamModal.propTypes = {
  addExam: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AddExamModal;
