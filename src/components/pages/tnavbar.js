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
            <a class="nav-link"  href="/"><b>HOME</b></a>
            <a><b>{userdata.img}</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/teacher/books/"><b>CRUD BOOKS</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/teacher/exams/"><b>CRUD EXAMS</b></a>
        </lisn>
        <lisn>
            <a class="nav-link"  href="/teacher/cquiz/"><b>CRUD QUIZ</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/teacher/asses/"><b>ASSES PAPERS</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/teacher/ccourses"><b>ADD COURSES</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/teacher/cqbank"><b>QUESTION BANK</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/teacher/"><b>TEACHER PORTAL</b></a>
        </lisn>
    </ulsn>
    );
}

export default Navbar;