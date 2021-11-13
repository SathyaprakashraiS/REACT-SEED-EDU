import { Link } from 'react-router-dom';
import './snavbar.css';
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
    // <nav className="navbar">
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
        
    // </nav>
    <ulsn>
        <lisn>
            <img class="profile" src={userdata.img}/>
        </lisn>
        <lisn>
            <h1>{userdata.username}</h1>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/"><b>HOME</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>COLLEGES</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>BOOKS</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>EXAMS</b></a>
        </lisn>
        <lisn>
            <a class="nav-link"  href="#"><b>NEWS</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>COURSES</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>QUESTION BANK</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>STUD PORTAL</b></a>
        </lisn>
    </ulsn>
    );
}

export default Navbar;
