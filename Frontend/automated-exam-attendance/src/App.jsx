// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LogIn/login';
import ExamManagementDashboard from "./Dashboard/ExamManagementDashboard";
import AuthenticationPage from './Authentication/AuthenticationPage';
import StyloxSignature from "./Stylox/stylox";
import AuthenticationSettings from "./Settings/AuthenticationSetting"

const App = () => {
  return (
    <>
      <Router>
        <main>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path="/dashboard" element={<ExamManagementDashboard />} />
                <Route path='/Exam' element={<StyloxSignature/>} />
                <Route path='/AuthenticationPage' element={<AuthenticationPage/>} />
                <Route path='/Settings' element={<AuthenticationSettings/>}/>
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
