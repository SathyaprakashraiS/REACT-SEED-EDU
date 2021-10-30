import '../../App.css';
import { Link } from 'react-router-dom';

function Home()
{
    return(
        <>
        <p>hello</p>
        <Link to="/book" className="navbar-links">Book</Link>
        </>
    );
}

export default Home;