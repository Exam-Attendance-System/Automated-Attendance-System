// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LogIn/login';
import ExamManagementDashboard from "./Dashboard/ExamManagementDashboard";

const App = () => {
  return (
    <Router>
        <main>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path="/dashboard" element={<ExamManagementDashboard />} />
            </Routes>
        </main>
    </Router>
  );
};

export default App;
