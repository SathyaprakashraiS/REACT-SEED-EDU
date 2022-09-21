import { Link,NavLink } from 'react-router-dom';
import './navbar.css';
import React,{useState} from 'react';
import { GoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router';
import { FaPlay,FaSchool,FaUniversity,FaBook, FaNewspaper, FaList, FaClock, FaQuestion, FaListAlt, FaDotCircle, FaDropbox, FaArrowDown, FaNotesMedical, FaWeebly, FaInternetExplorer, FaGlobe, FaGrav, FaUserAlt,FaBars} from "react-icons/fa";

function Navbar(){

    const [tog,settog] = useState(0)

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
        if(userdata.teacher == true)
      {
          teacher=true
          console.log("teacher here")
      }
      if(userdata.teacher == false){
          student=true
          console.log("student here")
      }
      }

      //for tog function
      const togfunction = ()=>{
        let bars = document.querySelector(".nav_tog")
        let navBar = document.querySelector(".nav-item")
        let navicon = document.querySelector(".nav-tog-icon")
      
            
          if(tog === 0){
            console.log("hello world")
            navBar.classList.add("nav_show")
            navicon.style.transform  = "rotate(90deg)"
            settog(1)
          }
          else if(tog!==0){
              console.log("close")
              navBar.classList.remove("nav_show")
              navicon.style.transform  = "rotate(180deg)"
              settog(0)
          }
      
      
        
    }
      
      
return(
    <nav className="navbar">
            <div className="nav_tog" onClick={togfunction}><FaBars className='nav-tog-icon'/></div>
            <ul>
                <li className='nav-item'>
                <Link to="/" onClick={clear} className="navbar-links">
                        SEED
                    </Link>
                    <NavLink to="/colleges" onClick={clear} className="navbar-links">
                    <FaUniversity/> COLLEGES
                    </NavLink>
                    <NavLink to="/book" onClick={clear} className="navbar-links">
                       <FaBook/> LIBRARY
                    </NavLink>
                    <NavLink to="/news" onClick={clear} className="navbar-links" >
                        <FaNewspaper/> NEWS
                    </NavLink>
                    <NavLink to="/courses" onClick={clear} className="navbar-links">
                        <FaList/> COURSES
                    </NavLink>
                    <NavLink to="/dates" onClick={clear} className="navbar-links">
                        <FaClock/> DATES
                    </NavLink>
                    <NavLink to="/questionbank" className="navbar-links">
                        <FaQuestion/> QUESTION BANK
                    </NavLink>
                   
                    <Link to="#"  className="other">
                        <FaArrowDown/> OTHER
                        <div className="dropdown">
                    <NavLink to="/revnotes" onClick={clear} className="navbar-links">
                        <FaBook/>REVISION NOTES
                    </NavLink>
                    <NavLink to="/video" onClick={clear} className="navbar-links">
                    <FaPlay/> VIDEO
                    </NavLink>
                    <NavLink to="/ocourses" onClick={clear} className="navbar-links">
                        <FaGlobe/> ONLINE COURSES
                    </NavLink>
                    <NavLink to="/contacts" className="navbar-links">
                        <FaQuestion/> CONTACTS
                    </NavLink>
                    </div>
                    </Link>
                    
                    {userdata ? (
                        <></>
                    ):(
                        <NavLink to="/login" onClick={clear} className="navbar-links">
                            LOGIN
                        </NavLink>
                    )}
                    {teacher && userdata ? (
                        <>
                        <NavLink to="/teacher" onClick={clear} className="navbar-links">
                            <FaUserAlt/>TEACHER PORTAL
                        </NavLink>
                        <Link to="#"  className="other">
                            <FaArrowDown/> {userdata.username}
                            <div className="dropdown">
                                <NavLink to="/viewprofile" onClick={clear} className="navbar-links">
                                    <FaBook/>VIEW PROFILE
                                </NavLink>
                                <NavLink to="/editprofile" onClick={clear} className="navbar-links">
                                    <FaPlay/>EDIT PROFILE
                                </NavLink>
                            </div>
                        </Link>
                        {/* <Link to="/" className="navbar-links">
                            <FaUserAlt/> {userdata.username}
                        </Link> */}
                        <NavLink to="/" className="navbar-links" onClick={logout}>LOGOUT
                    {/* <GoogleLogout 
                    className="logout"
                    theme="dark"
                    clientId="576119017330-jpt7fm9m1k2476fd8aadl6lrr4smstd0.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    >
                    </GoogleLogout> */}
                    </NavLink>
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
                        <Link to="#"  className="other">
                            <FaArrowDown/> {userdata.username}
                            <div className="dropdown">
                                <NavLink to="/viewprofile" onClick={clear} className="navbar-links">
                                    <FaBook/>VIEW PROFILE
                                </NavLink>
                                <NavLink to="/editprofile" onClick={clear} className="navbar-links">
                                    <FaPlay/>EDIT PROFILE
                                </NavLink>
                            </div>
                        </Link>
                        {/* <Link to="/" className="navbar-links">
                            <FaUserAlt/> {userdata.username}
                        </Link> */}
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