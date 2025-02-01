import { useState } from "react";
import "./DataManagement.css";

const DataManagement = () => {
 

  // State for data management settings
  const [retentionPeriod, setRetentionPeriod] = useState("");
  const [backupFrequency, setBackupFrequency] = useState("");
  const [isAutoBackupEnabled, setIsAutoBackupEnabled] = useState(false);
  const [backupLocation, setBackupLocation] = useState("default");
  const [activeTab, setActiveTab] = useState("DataManagement");

 

  // Handlers for Data Management Settings
  const handleAutoBackupToggle = () => {
    setIsAutoBackupEnabled(!isAutoBackupEnabled);
  };

  const handleSaveDataSettings = () => {
    if (!retentionPeriod || !backupFrequency || !backupLocation) {
      alert("Please fill in all data management settings.");
      return;
    }

    console.log("Data Management Settings saved:", {
      retentionPeriod,
      backupFrequency,
      isAutoBackupEnabled,
      backupLocation,
    });
    alert("Data management settings saved successfully!");
  };

  // Content rendering based on the active tab
  const renderContent = () => {

    if (activeTab === "DataManagement") {
      return (
        <div className="data-management-settings">
          <div className="data-header">
            <h2>Data Management Settings</h2>
            <p>Configure data retention, backup frequency, and backup settings.</p>
          </div>

          <div className="form-group">
            <label htmlFor="retention-period">Data Retention Period (days)</label>
            <input
              type="number"
              id="retention-period"
              value={retentionPeriod}
              onChange={(e) => setRetentionPeriod(e.target.value)}
              placeholder="Enter number of days"
            />
          </div>

          <div className="form-group">
            <label htmlFor="backup-frequency">Backup Frequency (hours)</label>
            <input
              type="number"
              id="backup-frequency"
              value={backupFrequency}
              onChange={(e) => setBackupFrequency(e.target.value)}
              placeholder="Enter backup frequency in hours"
            />
          </div>

          <div className="form-group-col1">
            <input
              type="checkbox"
              id="auto-backup"
              checked={isAutoBackupEnabled}
              onChange={handleAutoBackupToggle}
            />
            <label htmlFor="auto-backup">Enable Automatic Backup</label>
          </div>

          <div className="form-group">
            <label htmlFor="backup-location">Backup Location</label>
            <select
            id="backup-location"
            value={backupLocation}
            onChange={(e) => setBackupLocation(e.target.value)}>
              <option value="default"> Select Back Up Location</option>
              <option value="Cloud">Cloud Storage</option>
              <option value="Local">Local Storage</option>
              <option value="Both">Both Local & Cloud Storage</option>
            </select>
          </div>

          <div className="current-selection">
            <button
              className="current-selection-btn"
              onClick={handleSaveDataSettings}
            >
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
            activeTab === "DataManagement" ? "active" : ""
          }`}
          onClick={() => setActiveTab("DataManagement")}
        >
          Data Management
        </button>
      </div>

      {/* Content Container */}
      <div className="container">{renderContent()}</div>
    </div>
  );
};

export default DataManagement;
