import { Link } from 'react-router-dom';
import './tnavbar.css';
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
      var twelvegrade=false
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
          if(userdata.standard == 12){
            twelvegrade=true;
          }
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
            <a class="nav-link"  href="/teacher/"><b>TEACHER PORTAL</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/teacher/books/"><b>BOOKS</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/teacher/exams/"><b>EXAMS</b></a>
        </lisn>
        <lisn>
            <a class="nav-link"  href="/teacher/quiz/"><b>QUIZ</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/teacher/tapapers/"><b>ASSES PAPERS</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/teacher/course/"><b>COURSES</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/teacher/qpaper/"><b>QUESTION BANK</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/"><b>HOME</b></a>
        </lisn>
        <lisn >
            <Link to="/" className="navbar-links" onClick={logout}><b>LOGOUT</b></Link>
        </lisn>
    </ulsn>
    );
}

export default Navbar;