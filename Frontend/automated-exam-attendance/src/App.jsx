// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LogIn/login';
import DashboardPage from "./Dashboard/DashboardPage";
import AuthenticationPage from './QR Authentication/AuthenticationPage';
import SettingsMenuPage from "./SettingsMenu/SettingsMenuPage";
import StudentPage from "./Student/Studentpage";

const App = () => {
  // const isLoggedIn = /* logic to check if user is logged in */;
  // const isLoggedIn = sessionStorage.getItem('userid') !== null;
  const checkUserValidity = async (userid) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/user/isvalid`, {
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

  const isLoggedIn = async () => {
    const userid = sessionStorage.getItem('userid');
    if (userid) {
      return await checkUserValidity(userid);
    }
    return false;
  };

  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path='/' element={isLoggedIn ? <DashboardPage /> : <LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/dashboard" element={isLoggedIn ? <DashboardPage />: <LoginPage />} />
            <Route path="/Student" element={isLoggedIn ? <StudentPage />: <LoginPage />} />
            <Route path='/Exam' element={isLoggedIn ? <AuthenticationPage />: <LoginPage />} />
            <Route path='/Settings' element={isLoggedIn ? <SettingsMenuPage />: <LoginPage/>} />
          </Routes>
        </main>
      </Router>
    </>
  );
};

export default App;
