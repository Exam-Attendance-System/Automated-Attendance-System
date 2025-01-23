import  { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas"; // Install this package using npm or yarn
import "./stylox.css"; 

const StyloxSignature = () => {
  const signaturePadRef = useRef(null);
  const [isSigning, setIsSigning] = useState(false);

  const handleClear = () => {
    signaturePadRef.current.clear();
  };

  const handleSave = () => {
    if (signaturePadRef.current.isEmpty()) {
      alert("Please provide a signature first.");
      return;
    }
    const dataURL = signaturePadRef.current.toDataURL();
    console.log("Signature saved:", dataURL);
    alert("Signature saved successfully!");
  };

  const initializeSigning = () => {
    setIsSigning(true);
    handleClear();
  };

  return (
    <div className="stylox-signature-container">
      <h2>Student Signature</h2>
      {isSigning ? (
        <div className="signature-pad-container">
          <SignaturePad
            ref={signaturePadRef}
            canvasProps={{
              className: "signature-canvas",
            }}
          />
          <div className="signature-buttons">
            <button onClick={handleClear} className="btn-clear">
              Clear
            </button>
            <button onClick={handleSave} className="btn-save">
              Save Signature
            </button>
          </div>
        </div>
      ) : (
        <button onClick={initializeSigning} className="btn-init">
          Verify Attendance
        </button>
      )}
      <div>
        <button className="com-attendance-btn">Complete Attendance</button>
        </div>
    </div>
  );
};

export default StyloxSignature;
