import { useState } from 'react';
import './AuthenticationSettings.css'

const AuthenticationSettings = () => {
  // State for managing toggle and selected primary authentication method
  const [isQrEnabled, setIsQrEnabled] = useState(false);
  const [primaryAuthMethod, setPrimaryAuthMethod] = useState('password');

  // Handler for toggling QR code authentication
  const handleQrToggle = () => {
    setIsQrEnabled(!isQrEnabled);
  };

  // Handler for changing primary authentication method
  const handleAuthMethodChange = (e) => {
    setPrimaryAuthMethod(e.target.value);
  };

  const handleSaveSettings = () => {
    if (primaryAuthMethod === '') {
      alert('Please select a valid authentication method.');
      return;
    }

     // Simulate saving the settings
     console.log('Settings saved:', {
      isQrEnabled,
      primaryAuthMethod,
    });
    alert('Settings have been saved successfully!');
  };


  return (
    
    <div className="authentication-settings">
        <div className='auth-header'> 
        <h2>Authentication Settings</h2>
        <p>Configure QR code</p>
        </div>
     
      {/* Toggle for QR code authentication */}
      <div className="qr-toggle">
      <input
          type="checkbox"
          id="qr-toggle"
          checked={isQrEnabled}
          onChange={handleQrToggle}
        />
        <label htmlFor="qr-toggle">Enable QR Code Authentication</label>
      </div>

      {/* Dropdown for selecting primary authentication method */}
      <div className="auth-method-select">
        <label htmlFor="auth-method">Select Authentication Method</label>
        <select
          id="auth-method"
          value={primaryAuthMethod}
          onChange={handleAuthMethodChange}
        >
          <option value="default-phrase">Select Method</option>
          <option value="qr">QR Code Authentication</option>
          
        </select>
      </div>

      
      <div className="current-selection">
       <button  className="current-selection-btn" onClick={handleSaveSettings}>Save Settings</button>
      </div>
    </div>
  );
};

export default AuthenticationSettings;
