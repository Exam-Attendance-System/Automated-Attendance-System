import { useState } from "react";
import "./SystemIntegration.css";

const SystemIntegration = () => {
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [syncFrequency, setSyncFrequency] = useState("Daily");
  const [testStatus, setTestStatus] = useState("");
  const [activeTab, setActiveTab] =useState("SystemIntegration")

  const handleSaveSettings = () => {
    if (!apiEndpoint || !apiKey) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("Connection Settings saved:", { apiEndpoint, apiKey, syncFrequency });
    alert("Connection settings saved successfully!");
  };

  const handleTestConnection = () => {
    // Simulating connection test
    setTestStatus("Testing...");
    setTimeout(() => {
      setTestStatus("Connection successful!");
    }, 2000);
  };

  const renderContent =()=>{
    if(activeTab=== 'SystemIntegration'){
        return (
            <div className="connection-settings">
               
              <h2>System Integration</h2>
        
              <div className="form-group">
                <label htmlFor="api-endpoint">API Endpoint URL</label>
                <input
                  type="text"
                  id="api-endpoint"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  placeholder="Enter API endpoint URL"
                />
              </div>
        
              <div className="form-group">
                <label htmlFor="api-key">API Key</label>
                <input
                  type="password"
                  id="api-key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter API key"
                />
              </div>
        
              <div className="form-group">
                <label htmlFor="sync-frequency">Data Sync Frequency</label>
                <select
                  id="sync-frequency"
                  value={syncFrequency}
                  onChange={(e) => setSyncFrequency(e.target.value)}
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              <div className="system-integration-btn">
              <div className="form-group-btn">
                <button className="sys-settings-btn" onClick={handleTestConnection}>
                  Test Connection
                </button>
                <p>{testStatus}</p>
              </div>
        
              <div className="form-group-btn">
                <button className="sys-settings-btn" onClick={handleSaveSettings}>
                  Save Settings
                </button>
              </div>
            </div>
              </div>
              
          );
    }
   
  }
  return (
    <div>
      {/* Tabs outside the container */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'SystemIntegration' ? 'active' : ''}`}
          onClick={() => setActiveTab('SystemIntegration')}
        >
          System Integration
        </button>
        
      </div>
      {/* Container that holds content */}
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
};

export default SystemIntegration;
