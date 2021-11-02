import { Link } from 'react-router-dom';
//import './home.css';
import { GoogleLogout } from 'react-google-login';
import Navbar from './snavbar';

function Student(){
    const userdata = JSON.parse(localStorage.getItem('theuser'));
    console.log(userdata.username)
    console.log("in student portal")
return(
    <>
        <Navbar />
        <p>hello {userdata.username}</p>
    </>
    );
}

export default Student;
