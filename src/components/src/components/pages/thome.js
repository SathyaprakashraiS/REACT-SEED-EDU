import { Link } from 'react-router-dom';
import './css/thome.css';
import { GoogleLogout } from 'react-google-login';

function Teacher(){
    const userdata = JSON.parse(localStorage.getItem('theuser'));
    console.log(userdata.username)
    console.log("in teacher portal")
    
return(
        <p>hello teacher {userdata.username}</p>
    );
}

export default Teacher;
