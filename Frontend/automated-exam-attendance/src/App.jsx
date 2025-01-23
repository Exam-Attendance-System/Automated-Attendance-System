// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LogIn/login';
import ExamManagementDashboard from "./Dashboard/ExamManagementDashboard";
import AuthenticationPage from './Authentication/AuthenticationPage';

const App = () => {
  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path="/dashboard" element={<ExamManagementDashboard />} />
            <Route path='/AuthenticationPage' element={<AuthenticationPage/>} />
          </Routes>
        </main>
      </Router>
    </>
    // <Router>
    //     <main>
    //         <Routes>
    //             <Route path='/' element={<LoginPage/>}/>
    //             <Route path="/dashboard" element={<ExamManagementDashboard />} />
    //         </Routes>
    //     </main>
    // </Router>
  );
};

export default App;
