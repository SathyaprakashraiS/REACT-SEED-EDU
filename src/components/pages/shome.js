import { Link } from 'react-router-dom';
//import './shome.css';
import { GoogleLogout } from 'react-google-login';
import Navbar from './snavbar';

function Student(){
    const userdata = JSON.parse(localStorage.getItem('theuser'));
    var student=false
    if(userdata.is_staff == false){
        student=true
    }
return(
    <>
    <Navbar />
    <p>hello {userdata.username}</p>
    <p>student portal</p>
    </>
    );
}

export default Student;
