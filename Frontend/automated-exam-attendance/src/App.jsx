import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './LogIn/login';
import DashboardPage from "./Dashboard/DashboardPage";
import AuthenticationPage from './QR Authentication/AuthenticationPage';
import SettingsMenuPage from "./SettingsMenu/SettingsMenuPage";
import StudentPage from "./Student/StudentPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // State to track login status
  const navigate = useNavigate(); // Initialize the navigate function

  const checkUserValidity = async (userid) => {
    try {
      const response = await fetch(`https://automated-attendance-system.onrender.com/api/user/isvalid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid }),
      });
      const data = await response.json();
      return data.isValid;
    } catch (error) {
      console.error('Error checking user validity:', error);
      return false;
    }
  };

  const getSessionItem = (key) => {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const checkLoginStatus = async () => {
    const userid = getSessionItem('session_id'); // Ensure you're using the correct key
    if (userid) {
      const valid = await checkUserValidity(userid);
      setIsLoggedIn(valid);
      if (valid) {
        navigate("/dashboard"); // Redirect to dashboard if valid
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Check login status on initial load

    const interval = setInterval(() => {
      if (isLoggedIn) {
        const userid = getSessionItem('session_id');
        if (userid) {
          checkUserValidity(userid); // Check validity at intervals
        }
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isLoggedIn, navigate]); // Add dependencies

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Show a loading state while checking login status
  }

  return (
    
      <main>
        <Routes>
          <Route path='/' element={isLoggedIn ? <DashboardPage /> : <LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <LoginPage />} />
          <Route path="/Student" element={isLoggedIn ? <StudentPage /> : <LoginPage />} />
          <Route path='/Exam' element={isLoggedIn ? <AuthenticationPage /> : <LoginPage />} />
          <Route path='/Settings' element={isLoggedIn ? <SettingsMenuPage /> : <LoginPage />} />
        </Routes>
      </main>
    
  );
};

export default App;
