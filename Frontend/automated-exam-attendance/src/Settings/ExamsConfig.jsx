import { useState } from "react";
import './ExamsConfig.css'

const ExamConfiguration = () => {
  // State to manage exam duration and late entry time
  const [examDuration, setExamDuration] = useState('');
  const [lateEntry, setLateEntry] = useState('');
  const [activeTab, setActiveTab] = useState('ExamsConfig')

  // Handlers for input changes
  const handleExamDurationChange = (e) => {
    setExamDuration(e.target.value);
  };

  const handleLateEntryChange = (e) => {
    setLateEntry(e.target.value);
  };
  const renderContent=()=>{
    if(activeTab === 'ExamsConfig'){
    return (
      <div className="configuration-settings">
        <h2>Exam Configuration</h2>
        <p>Set the exam duration and allowed late entry time for students.</p>
  
        {/* Exam Duration Input */}
        <div className="input-group">
          <h4>Exam Duration (minutes)</h4>
          <input
            type="number"
            id="exam-duration"
            value={examDuration}
            onChange={handleExamDurationChange}
            placeholder="Enter exam duration"
          />
        </div>
  
        {/* Late Entry Input */}
        <div className="input-group">
          <h4>Late Entry (minutes)</h4>
          <input
            type="number"
            id="late-entry"
            value={lateEntry}
            onChange={handleLateEntryChange}
            placeholder="Enter late entry allowance"
          />
        </div>
        <button className="exams-config-btn">Save Configuration</button>
      </div>
    );
  }}
  return(
    <div>
    {/* Tabs */}
    <div className="tabs">
      <button
        className={`tab-button ${activeTab === 'ExamsConfig' ? 'active' : ''}`}
        onClick={() => setActiveTab('ExamsConfig')}
      >
        Exams Configuration
      </button>
    </div>

    {/* Content Container */}
    <div className="container">{renderContent()}</div>
  </div>
  );
};

export default ExamConfiguration;
