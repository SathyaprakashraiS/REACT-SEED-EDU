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
        </lisn>
        {twelvegrade ? (
            <lisn >
            <a class="nav-link"  href="#"><b>COLLEGES</b></a>
        </lisn>
        ):(
        //     <lisn >
        //     <a class="nav-link"  href="#"><b>DONT DISP COLLEGES</b></a>
        // </lisn>
        <>
        </>
        )}
        <lisn >
            <a class="nav-link"  href="/student/book/"><b>BOOKS</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/student/exam/"><b>PRACTISE TEST</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="#"><b>COMPETITIVE EXAMS</b></a>
            {/* ITHU THEVA THERLA MOSTLY TIPS AND REVISIONNOTES AND VIDEOS PODALANUM ERUKEN */}
        </lisn>
        <lisn>
            <a class="nav-link"  href="/student/srevnotes/"><b>REVISION NOTES</b></a>
        </lisn>
        {/* NEWS NOT REQUIREED TO BE REMOVEd */}
        {/* <lisn>
            <a class="nav-link"  href="/student/news/"><b>NEWS</b></a>
        </lisn> */}
        {twelvegrade ? (
            <lisn >
            <a class="nav-link"  href="#"><b>COURSES</b></a>
        </lisn>
        ):(
            <>
            </>
        )}
        <lisn >
            <a class="nav-link"  href="/student/questionbank/"><b>QUESTION BANK</b></a>
        </lisn>
        <lisn >
            <a class="nav-link"  href="/student/"><b>STUD PORTAL</b></a>
        </lisn>
    </ulsn>
    );
}

export default Navbar;