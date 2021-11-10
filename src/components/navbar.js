import { Link } from 'react-router-dom';
import './navbar.css';
import { GoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router';

function Navbar(){

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
                <Link to="/" className="navbar-links">
                        SEED
                    </Link>
                    <Link to="/colleges" className="navbar-links">
                        COLLEGES
                    </Link>
                    <Link to="/book" className="navbar-links">
                        LIBRARY
                    </Link>
                    <Link to="/news" className="navbar-links">
                        NEWS
                    </Link>
                    <Link to="/courses" className="navbar-links">
                        COURSES
                    </Link>
                    <Link to="/" className="navbar-links">
                        DATES
                    </Link>
                    <Link to="/" className="navbar-links">
                        QUESTION BANK
                    </Link>
                    <Link to="/" className="navbar-links">
                        OTHER
                    </Link>
                    {userdata ? (
                        <></>
                    ):(
                        <Link to="/login" className="navbar-links">
                            LOGIN
                        </Link>
                    )}
                    {teacher && userdata ? (
                        <>
                        <Link to="/teacher" className="navbar-links">
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
                            STUDENT PORTAL
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
