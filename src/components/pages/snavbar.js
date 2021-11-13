import { Link } from 'react-router-dom';
import './snavbar.css';
import { GoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router';

function Navbar(){

    const clear = ()=>{
        localStorage.removeItem("quizid")
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
    //<nav className="navbar">
    //         <ul>
    //             <li className='nav-item'>
    //                 <Link to="/" className="navbar-links">
    //                     HOME
    //                 </Link>
    //                 <Link to="/book" className="navbar-links">
    //                     BOOK
    //                 </Link>
    //                 <Link to="/news" className="navbar-links">
    //                     NEWS
    //                 </Link>
    //             </li>
    //         </ul>
    //</nav>
    <ulsn>
        <lisn>
            <img class="profile" src={userdata.img}/>
        </lisn>
        <lisn>
            <h1>{userdata.username}</h1>
        </lisn>
        <lisn >
            <Link to="/student" onClick={clear} className="navbar-links"><b>HOME</b></Link>
            {/* <Link to="/" onClick={clear} className="navbar-links">SEED</Link> */}
        </lisn>
        <lisn >
        <Link to="/student" onClick={clear} className="navbar-links"><b>COLLEGES</b></Link>
        </lisn>
        <lisn >
        <Link to="/student" onClick={clear} className="navbar-links"><b>BOOKS</b></Link>
        </lisn>
        <lisn >
        <Link to="/student" onClick={clear} className="navbar-links"><b>EXAMS</b></Link>
        </lisn>
        <lisn>
        <Link to="/student" onClick={clear} className="navbar-links"><b>NEWS</b></Link>
        </lisn>
        <lisn >
        <Link to="/student" onClick={clear} className="navbar-links"><b>COURSES</b></Link>
        </lisn>
        <lisn >
        <Link to="/student" onClick={clear} className="navbar-links"><b>QUESTION BANK</b></Link>
        </lisn>
        <lisn >
        <Link to="/student" onClick={clear} className="navbar-links"><b>STUDENT PORTAL</b></Link>
        </lisn>
    </ulsn>
    );
}

export default Navbar;
