import { useState } from "react";
import "./SecuritySettings.css";

const SecuritySettings = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [twoFAMethod, setTwoFAMethod] = useState("");
  const [sessionTimeout, setSessionTimeout] = useState("");
  const [isIpWhitelistingEnabled, setIsIpWhitelistingEnabled] = useState(false);
  const [allowedIPs, setAllowedIPs] = useState("");
  const [activeTab, setActiveTab] = useState("SecuritySettings");

  // Handlers
  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
  };

  const handleTwoFAMethodChange = (e) => {
    setTwoFAMethod(e.target.value);
  };

  const handleSessionTimeoutChange = (e) => {
    setSessionTimeout(e.target.value);
  };

  const handleIpWhitelistingToggle = () => {
    setIsIpWhitelistingEnabled(!isIpWhitelistingEnabled);
  };

  const handleAllowedIPsChange = (e) => {
    setAllowedIPs(e.target.value);
  };

  const handleSaveSettings = () => {
    if (!twoFAMethod || twoFAMethod === "default") {
      alert("Please select a valid 2FA method.");
      return;
    }

    console.log("Settings saved:", {
      is2FAEnabled,
      twoFAMethod,
      sessionTimeout,
      isIpWhitelistingEnabled,
      allowedIPs,
    });

    alert("Security settings saved successfully!");
  };

  // Render content based on the active tab
  const renderContent = () => {
    if (activeTab === "SecuritySettings") {
      return (
        <div className="security-settings">
          <h2>Security Settings</h2>
          <p>Configure Two-Factor Authentication (2FA) and Access Control</p>

          {/* Two-Factor Authentication Toggle */}
          <div className="form-group-col1">
            
            <input
              type="checkbox"
              id="2FA-toggle"
              checked={is2FAEnabled}
              onChange={handleToggle2FA}
            />
            <label htmlFor="2FA-toggle">Enable Two-Factor Authentication</label>
          </div>

          {/* Two-Factor Authentication Method Selection */}
          <div className="form-group">
            <label htmlFor="2FA-method">Select 2FA Method</label>
            <select
              id="TwoFA-method"
              value={twoFAMethod}
              onChange={handleTwoFAMethodChange}
            >
              <option value="default">Select Method</option>
              <option value="authentication app">Authentication App</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </select>
          </div>

          {/* Session Timeout */}
          <div className="form-group">
            <label htmlFor="session-timeout">Session Timeout (minutes)</label>
            <input
              type="number"
              id="session-timeout"
              value={sessionTimeout}
              onChange={handleSessionTimeoutChange}
              placeholder="Enter Session Timeout"
            />
          </div>

          {/* IP Whitelisting Toggle */}
          <div className="form-group-col1">
            
            <input
              type="checkbox"
              id="ip-whitelisting-toggle"
              checked={isIpWhitelistingEnabled}
              onChange={handleIpWhitelistingToggle}
            />
            <label htmlFor="ip-whitelisting-toggle">Enable IP Whitelisting</label>
          </div>

          {/* Allowed IP Addresses Input */}
          {isIpWhitelistingEnabled && (
            <div className="form-group">
              <label htmlFor="ip-whitelisting-text">Allowed IP Addresses</label>
              <input
                type="text"
                id="ip-whitelisting-text"
                value={allowedIPs}
                onChange={handleAllowedIPsChange}
                placeholder="Enter comma-separated IPs"
              />
            </div>
          )}

          {/* Save Button */}
          <div className="form-group">
            <button className="save-settings-btn" onClick={handleSaveSettings}>
              Save Settings
            </button>
          </div>
        </div>
      );
    }

    return <div>Please select a tab to view its content.</div>;
  };

  return (
    <div>
      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-button ${
            activeTab === "SecuritySettings" ? "active" : ""
          }`}
          onClick={() => setActiveTab("SecuritySettings")}
        >
          Security Settings
        </button>
      </div>

      {/* Content Container */}
      <div className="container">{renderContent()}</div>
    </div>
  );
};

export default SecuritySettings;
