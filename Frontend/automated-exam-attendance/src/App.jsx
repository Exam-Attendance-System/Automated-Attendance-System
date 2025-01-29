// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LogIn/login';
import DashboardPage from "./Dashboard/DashboardPage";
import AuthenticationPage from './QR Authentication/AuthenticationPage';
import SettingsMenuPage from "./SettingsMenu/SettingsMenuPage";
import StudentPage from "./Student/Studentpage";

const App = () => {
  return (
    <>
      <Router>
        <main>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path="/dashboard" element={<DashboardPage/>} />
                <Route path="/Student" element={<StudentPage/>} />
                <Route path='/Exam' element={<AuthenticationPage/>} />
                <Route path='/Settings' element={<SettingsMenuPage/>}/>
               
            </Routes>
        </main>
      </Router>
    </>
  );
};

export default App;
