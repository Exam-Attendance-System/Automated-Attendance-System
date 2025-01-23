import  {  useState } from 'react';
import './RFIDAuthentication.css';
import {QrReader} from "react-qr-reader";

const RFIDAuthentication = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [rfidTag, setRfidTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');

  const validQRCodeData = ["QRCode123", "QRCode456", "QRCode789"];

  const handleClear = () => {
    setRfidTag('');
    setVerificationStatus('');
  };

  const handleVerifyAttendance = () =>{
    setLoading(true);
    setVerificationStatus('');

      setTimeout(() =>{
         // Here you can implement the actual verification logic
         if (rfidTag === "VALID TAG"){
          setVerificationStatus('Verified');
         } else {
          setVerificationStatus("Invalid QR");
         }('2000'); // Simulating a 2-second delay for loading
      })
  }

  const handleQRScan = (capturedData) => {
    setIsScanning(true);
    setFeedback(null);

    // Simulate a scanning process
    setTimeout(() => {
      if (validQRCodeData.includes(capturedData)) {
        // Simulate successful verification

      setIsScanning(false);
      setFeedback({
        status: 'success',
        message: 'Verification successful!',
      });
    } else {
      // Simulate failed verification
      setFeedback({
        status: 'error',
        message: 'Verification failed. Try again.',
      });
    }  setIsScanning(false);
    }, 2000); // Simulate a delay for scanning
  };




  return (
    <div className="RFID-container">
      <h3>Authentication Process</h3>
      <p>Authenticate Amuzu Mohammed</p>
      <button
        className="QR-Scanner-button"
        onClick={handleQRScan}
        disabled={isScanning}
      >
        {isScanning ? 'Scanning...' : 'QR Scanner'}
      </button>

      {isScanning && (
        <div className="scanner-overlay">
          <div className="scanner-line">
          <QrReader
        delay={2000}
        onScan={handleQRScan}
      />
          </div>
        </div>
      )}

      {feedback && (
        <div className={`feedback ${feedback.status}`}>
          {feedback.message}
        </div>
      )}

      <div className="RFID-Tag" >
        <h4>Scan Student ID Card</h4>
        <label>
          <input id="RFID Tag" placeholder="RFID Tag"value={rfidTag}
              onChange={(e) => setRfidTag(e.target.value)} />
        </label>
        <br />
        <button className="Clear-button" onClick={handleClear}>Clear</button>
        <button className="Verify-button" onClick={handleVerifyAttendance}>Verify Attendance</button>
        {loading && <div className="spinner"></div>} {/* Spinner for loading */}
        {verificationStatus && <p>Status: {verificationStatus}</p>} {/* Display verification status */}
      </div>
    </div>
  );
};

export default RFIDAuthentication;


