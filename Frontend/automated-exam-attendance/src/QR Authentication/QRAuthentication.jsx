import { useState } from "react";
import "./QRAuthentication.css";
import { QrReader } from "react-qr-reader";
import StyloxSignature from "../Stylox/stylox";

const RFIDAuthentication = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [rfidTag, setRfidTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [showSignature, setShowSignature] = useState(false); // New state

  const validQRCodeData = ["QRCode123", "QRCode456", "QRCode789"];

  const handleClear = () => {
    setRfidTag("");
    setVerificationStatus("");
  };

  const handleVerifyAttendance = () => {
    setLoading(true);
    setVerificationStatus("");

    setTimeout(() => {
      if (rfidTag === "VALID TAG") {
        setVerificationStatus("Verified");
        setShowSignature(true); 
      } else {
        setVerificationStatus("Invalid QR");
      }
      setLoading(false); 
    }, 2000); 
  };

  const handleQRScan = (capturedData) => {
    setIsScanning(true);
    setFeedback(null);

    setTimeout(() => {
      if (validQRCodeData.includes(capturedData)) {
        setIsScanning(false);
        setFeedback({
          status: "success",
          message: "Verification successful!",
        });
      } else {
        setFeedback({
          status: "error",
          message: "Verification failed. Try again.",
        });
      }
      setIsScanning(false);
    }, 2000);
  };

  if (showSignature) {
    // Display the StyloxSignature component
    return <StyloxSignature />;
  }

  return (
    <div>
      <div className="title">
          <h2>Exam Attendance</h2>
        </div>
      <div className="QR-container">
      <h2>Authentication Process</h2>
      <p>Authenticate Amuzu Mohammed</p>
      <button
        className="QR-Scanner-button"
        onClick={handleQRScan}
        disabled={isScanning}
      >
        {isScanning ? "Scanning..." : "QR Scanner"}
      </button>

      {isScanning && (
        <div className="scanner-overlay">
          <div className="scanner-line">
            <QrReader delay={2000} onScan={handleQRScan} />
          </div>
        </div>
      )}

      {feedback && (
        <div className={`feedback ${feedback.status}`}>{feedback.message}</div>
      )}

      <div className="QR-Tag">
        <h4>Scan Student ID Card</h4>
        <label>
          <input
            id="QR Tag"
            placeholder="QR Tag"
            value={rfidTag}
            onChange={(e) => setRfidTag(e.target.value)}
          />
        </label>
        <br />
        <div className="QR-buttons">
        <button className="Clear-button" onClick={handleClear}>
          Clear
        </button>
        <button className="Verify-button" onClick={handleVerifyAttendance}>
          Verify Attendance
        </button>
        </div>
        {loading && <div className="spinner"></div>}
        {verificationStatus && <p>Status: {verificationStatus}</p>}
      </div>
    </div>
    
    </div>
    
  );
};

export default RFIDAuthentication;
