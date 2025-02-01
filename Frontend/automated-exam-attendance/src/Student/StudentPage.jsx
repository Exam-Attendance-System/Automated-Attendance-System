import Student from "./Student"
import Header from "../Header/header"
import Sidebar from "../Sidebar/sidebar"


const StudentsPage =()=>{
    return(
        <div>
            <Sidebar/>
            <Header/>
            <Student/>
        </div>
    )
}

export default StudentsPage;