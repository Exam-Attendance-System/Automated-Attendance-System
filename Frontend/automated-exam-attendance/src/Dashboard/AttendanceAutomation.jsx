import { useState } from 'react';
import QRcode from '../assets/qr code.png'
import './AttendanceAutomation.css'; // Add styles here

function AttendanceOptions() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    alert(`You selected: ${option}`); // For demonstration purposes
  };

  return (
    <div className="attendance-options-container">
      <h2>Attendance Automation</h2>
      <p>Preferred method for automating attendance</p>
      <div className="options">
        <div
          className={`option-card ${selectedOption === 'QR Code' ? 'selected' : ''}`}
          onClick={() => handleOptionClick('QR Code')}
        >
          <img
            src={QRcode}
            alt="QR Code"
            className="option-icon"
          />
          <h3>QR Code</h3>
          <p>Track attendance by scanning a QR code from your Student ID.</p>
        </div>
        
      </div>
      {selectedOption && (
        <div className="selected-option">
          <h3>Selected Option: {selectedOption}</h3>
        </div>
      )}
    </div>
  );
}

export default AttendanceOptions;
