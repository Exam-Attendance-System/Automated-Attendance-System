import { useState } from "react";
import "./UserManagement.css";

const UserManagement = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [activeTab, setActiveTab] = useState('userManagement'); 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
  };

  const renderContent = () => {
    if (activeTab === 'userManagement') {
      return (
        <div>
          <div className="heading-container">
            <h2>User Management</h2>
          </div>
          <p className="sub-heading">Manage Admins Account</p>
          <form onSubmit={handleSubmit} className="centered-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="form-control"
                placeholder="Enter Your Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                required
                className="form-control"
                placeholder="Enter Your Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
                className="form-control"
                placeholder="Confirm Password"
              />
            </div>
            <button type="submit" className="btn-primary">
              Update Account
            </button>
          </form>
        </div>
      );
    } else if (activeTab === 'authConfig') {
      return (
        <div>
          <div className="heading-container">
            <h2>Authentication Exam Configuration</h2>
          </div>
          <p className="sub-heading">Configure exam authentication settings here.</p>
          {/* Add your authentication configuration form or content here */}
        </div>
      );
    }
  };

  return (
    <div>
      {/* Tabs outside the container */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'userManagement' ? 'active' : ''}`}
          onClick={() => setActiveTab('userManagement')}
        >
          User Management
        </button>
        
      </div>
      {/* Container that holds content */}
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
}

export default UserManagement;
