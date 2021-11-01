import { Link } from 'react-router-dom';
import './navbar.css';
import { GoogleLogout } from 'react-google-login';

function Navbar(){

  const logout = ()=>{
    localStorage.clear(); //for localStorage
    sessionStorage.clear(); //for sessionStorage
    
  }
return(
    <nav className="navbar">
            <ul>
                <li className='nav-item'>
                    <Link to="/" className="navbar-links">
                        HOME
                    </Link>
                    <Link to="/book" className="navbar-links">
                        Book
                    </Link>
                    <Link to="/logout" className="navbar-links">
                    <GoogleLogout 
                    className="logout"
                    theme="dark"
                    clientId="576119017330-jpt7fm9m1k2476fd8aadl6lrr4smstd0.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    >
                    </GoogleLogout>
                    </Link>
                </li>
            </ul>
        
    </nav>
    );
}

export default Navbar;
