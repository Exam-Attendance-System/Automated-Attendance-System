import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import ExamManagementDashboard from './ExamManagementDashboard'


function DashboardPage (){
    return(
        <div>
             <Sidebar />
             <Header />
             <ExamManagementDashboard/>
        </div>
       
    )
}

export default DashboardPage