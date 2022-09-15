import { Link } from 'react-router-dom';
import './navbar.css';
import { GoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router';
import { FaPlay,FaSchool,FaUniversity,FaBook, FaNewspaper, FaList, FaClock, FaQuestion, FaListAlt, FaDotCircle, FaDropbox, FaArrowDown, FaNotesMedical, FaWeebly, FaInternetExplorer, FaGlobe, FaGrav, FaUserAlt } from "react-icons/fa";

function Navbar(){

    const clear = ()=>{
        localStorage.removeItem("paperid")
        localStorage.removeItem("notesid")
    }
    const logout = ()=>{
        localStorage.clear(); //for localStorage
        sessionStorage.clear(); //for sessionStorage
        // window.location.reload(false);
        return(
            <Redirect to="/"/>
        )
      }
      const userdata = JSON.parse(localStorage.getItem('theuser'));
      var teacher=false
      var student=false
      if(userdata)
      {
          console.log("userdata.is_staff is ",userdata.is_staff)
        if(userdata.is_staff == true)
      {
          teacher=true
          console.log("teacher here")
      }
      if(userdata.is_staff == false){
          student=true
          console.log("student here")
      }
      }
return(
    <nav className="navbar">
            <ul>
                <li className='nav-item'>
                <Link to="/" onClick={clear} className="navbar-links">
                        SEED
                    </Link>
                    <Link to="/colleges" onClick={clear} className="navbar-links">
                    <FaUniversity/> COLLEGES
                    </Link>
                    <Link to="/book" onClick={clear} className="navbar-links">
                       <FaBook/> LIBRARY
                    </Link>
                    <Link to="/news" onClick={clear} className="navbar-links">
                        <FaNewspaper/> NEWS
                    </Link>
                    <Link to="/courses" onClick={clear} className="navbar-links">
                        <FaList/> COURSES
                    </Link>
                    <Link to="/dates" onClick={clear} className="navbar-links">
                        <FaClock/> DATES
                    </Link>
                    <Link to="/questionbank" className="navbar-links">
                        <FaQuestion/> QUESTION BANK
                    </Link>
                    <Link to="#"  className="other">
                        <FaArrowDown/> OTHER
                        <div className="dropdown">
                    <Link to="/revnotes" onClick={clear} className="navbar-links">
                        <FaBook/>REVISION NOTES
                    </Link>
                    <Link to="/video" onClick={clear} className="navbar-links">
                    <FaPlay/> VIDEO
                    </Link>
                    <Link to="/ocourses" onClick={clear} className="navbar-links">
                        <FaGlobe/> ONLINE COURSES
                    </Link>
                    </div>
                    </Link>
                    
                    {userdata ? (
                        <></>
                    ):(
                        <Link to="/login" onClick={clear} className="navbar-links">
                            LOGIN
                        </Link>
                    )}
                    {teacher && userdata ? (
                        <>
                        <Link to="/teacher" onClick={clear} className="navbar-links">
                            TEACHER PORTAL
                        </Link>
                        <Link to="/" className="navbar-links" onClick={logout}>LOGOUT
                    {/* <GoogleLogout 
                    className="logout"
                    theme="dark"
                    clientId="576119017330-jpt7fm9m1k2476fd8aadl6lrr4smstd0.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    >
                    </GoogleLogout> */}
                    </Link>
                    </>
                    ):(
                        <>
                    </>
                    )}
                    {student && userdata ? (
                        <>
                        <Link to="/student" className="navbar-links">
                            <FaUserAlt/> STUDENT PORTAL
                        </Link>
                        <Link to="/" className="navbar-links" onClick={logout}>LOGOUT
                    {/* <GoogleLogout 
                    className="logout"
                    theme="dark"
                    clientId="576119017330-jpt7fm9m1k2476fd8aadl6lrr4smstd0.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    >
                    </GoogleLogout> */}
                    </Link>
                    </>
                    ):(
                        <>
                    </>
                    )}
                </li>
            </ul>
        
    </nav>
    );
}

export default Navbar;
