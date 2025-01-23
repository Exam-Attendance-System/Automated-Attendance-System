import React, { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = () => {
  const [scannedData, setScannedData] = useState("");

  const handleScan = (decodedText) => {
    setScannedData(decodedText);

    // Send the scanned data to the server for validation
    fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qr_code_data: decodedText }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || "Attendance recorded successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to record attendance. Please try again.");
      });
  };

  const handleError = (error) => {
    console.error("QR Code Scan Error:", error);
  };

  React.useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    html5QrcodeScanner.render(handleScan, handleError);

    return () => {
      html5QrcodeScanner.clear();
    };
  }, []);

  return (
    <div>
      <h1>Scan QR Code for Attendance</h1>
      <div id="reader"></div>
      {scannedData && <p>Scanned Data: {scannedData}</p>}
    </div>
  );
};

export default QRScanner;
