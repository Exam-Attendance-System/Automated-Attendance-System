import './NotificationSetting.css';
import { useState } from 'react';

const Notifications = () => {
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState('Select Frequency');
  const [selectedNotificationTypes, setSelectedNotificationTypes] = useState({
    exam: false,
    updates: false,
    alert: false,
  });
  const [activeTab, setActiveTab] = useState('Notifications');

  const handleToggle = (type) => {
    if (type === 'email') {
      setEmailEnabled(!emailEnabled);
    } else if (type === 'sms') {
      setSmsEnabled(!smsEnabled);
    }
  };

  const handleFrequencyChange = (e) => {
    setNotificationFrequency(e.target.value);
  };

  const handleCheckboxChange = (type) => {
    setSelectedNotificationTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSaveSettings = () => {
    if (!emailEnabled && !smsEnabled) {
      alert('Please enable at least one notification method (Email or SMS).');
      return; // Exit the function if no notification method is enabled
    }

    const enabledNotificationTypes = Object.keys(selectedNotificationTypes).filter(
      (type) => selectedNotificationTypes[type]
    );

    if (enabledNotificationTypes.length === 0) {
      alert('Please select at least one notification type.');
      return; // Exit the function if no notification type is selected
    }

    // Log and save settings if everything is valid
    console.log('Notification Settings Saved:', {
      emailEnabled,
      smsEnabled,
      notificationFrequency,
      selectedNotificationTypes,
    });

    alert('Notification settings have been saved successfully!');
  };

  const renderContent = () => {
    if (activeTab === 'Notifications') {
      return (
        <div>
          <div>
            <h2>Notification Settings</h2>
            <p>Configure Email or SMS alerts</p>
          </div>

          <div className="toggle-section">
            <div className="toggle">
              <input
                type="checkbox"
                id="email-toggle"
                checked={emailEnabled}
                onChange={() => handleToggle('email')}
              />
              <label htmlFor="email-toggle">Enable Email Notifications</label>
            </div>

            <div className="toggle">
              <input
                type="checkbox"
                id="sms-toggle"
                checked={smsEnabled}
                onChange={() => handleToggle('sms')}
              />
              <label htmlFor="sms-toggle">Enable SMS Notifications</label>
            </div>
          </div>

          <div className="frequency-section">
            <label htmlFor="frequency-dropdown">Notification Frequency</label>
            <select
              id="frequency-dropdown"
              value={notificationFrequency}
              onChange={handleFrequencyChange}
            >
              <option value="Select Frequency">Select Frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="notification-types-section">
            <p>Select Notification Types</p>
            <div className="checkbox-group">
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="exam-checkbox"
                  checked={selectedNotificationTypes.exam}
                  onChange={() => handleCheckboxChange('exam')}
                />
                <label htmlFor="exam-checkbox">Exam Reminder</label>
              </div>

              <div className="checkbox">
                <input
                  type="checkbox"
                  id="updates-checkbox"
                  checked={selectedNotificationTypes.updates}
                  onChange={() => handleCheckboxChange('updates')}
                />
                <label htmlFor="updates-checkbox">Results Update</label>
              </div>

              <div className="checkbox">
                <input
                  type="checkbox"
                  id="alert-checkbox"
                  checked={selectedNotificationTypes.alert}
                  onChange={() => handleCheckboxChange('alert')}
                />
                <label htmlFor="alert-checkbox">System Alert</label>
              </div>
            </div>
          </div>

          <button className="save-settings-btn" onClick={handleSaveSettings}>
            Save Notification Settings
          </button>
        </div>
      );
    }

    // Return a default message or handle other tabs if needed
    return <p>Tab content not available.</p>;
  };

  return (
    <div>
      {/* Tabs outside the container */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'Notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('Notifications')}
        >
          Notification Settings
        </button>
      </div>
      {/* Container that holds content */}
      <div className="container">{renderContent()}</div>
    </div>
  );
};

export default Notifications;
