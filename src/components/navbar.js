import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar(){


return(
    <nav className="navbar">
            <ul>
                <li className='nav-item'>
                    <Link to="/" className="navbar-links">
                        HOME
                    </Link>
                    <Link to="/book" className="navbar-links">
                        BOOK
                    </Link>
                    <Link to="/news" className="navbar-links">
                        NEWS
                    </Link>
                    <Link to="/login" className="navbar-links">
                        LOGIN
                    </Link>
                </li>
            </ul>
        
    </nav>
    );
}

export default Navbar;
