import { useState } from "react";
import SettingsMenu from "./SettingsMenu";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import UserManagement from "../Settings/UserManagement"; 
import AuthenticationSettings from "../Settings/AuthenticationSettingsPage"; 
import ExamConfig from "../Settings/ExamsConfig"; 
import Notifications from "../Settings/NotificationSetting";
import DataManagement from "../Settings/DataManagement";
import SystemIntegration from "../Settings/SystemIntegration";
import SecuritySettings from "../Settings/SecuritySettings";

function SettingsMenuPage() {
  const [activeTab, setActiveTab] = useState("");

  // Function to render the content of the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "User Management":
        return <UserManagement />;
      case "Authentication settings":
        return <AuthenticationSettings />;
      case "Exam Configuration":
        return <ExamConfig />;
      case "Notification settings":
        return <Notifications/>
      case "Data Management":
        return <DataManagement/>
      case "System Integration":
        return <SystemIntegration/>
      case "Security Settings":
        return <SecuritySettings/>
      default:
        return <div>Please select a tab to view its content</div>;
    }
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <SettingsMenu
        activeTab={activeTab}
        onTabClick={(tabName) => setActiveTab(tabName)}
      />
      <div className="tab-content">{renderTabContent()}</div> {/* Display active tab content */}
    </div>
  );
}

export default SettingsMenuPage;
