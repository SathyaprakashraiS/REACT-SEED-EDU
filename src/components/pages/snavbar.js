import { Link } from 'react-router-dom';
import { useState } from 'react';
import './snavbar.css';
import { GoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router';
import {FaBars}  from "react-icons/fa";

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


      //navtog

      const [tog,settog] =useState(0)

      const tognav = () =>{
        let ndiv = document.querySelector(".shome_nav_tog")
        let nicon = document.querySelector(".shome_nav_icon")
        let snav = document.querySelector(".shome_nav")
      
        if(tog===0){
          snav.classList.add("show_snav")
          nicon.style.transform  = "rotate(90deg)"
          settog(1)
        }
        else if(tog===1){
            snav.classList.remove("show_snav")
            nicon.style.transform  = "rotate(180deg)"
            settog(0)
        }
      }
return(
    <div>
    <div className='shome_nav_tog' onClick={tognav}><FaBars className="shome_nav_icon"/></div>
    <ul className='shome_nav'>
        <li className='shome_nav_item'>
            <div className='s_imgdiv'><img className="sprofile" src={userdata.img} onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="https://sportshub.cbsistatic.com/i/2021/12/22/4960c882-7f88-4de6-be05-14cf8138215f/doctor-strange-2-trailer-evil-doctor-strange-supreme-theories.jpg";
  }}/></div>
            
        </li>
        <li className='shome_nav_item'>
            <h1>{userdata.username}</h1>
        </li>
        <li className='shome_nav_item'>
            <a class="nav-link"  href="/student/"><b>STUD PORTAL</b></a>
        </li> 
        {twelvegrade ? (
            <li className='shome_nav_item'>
            <a class="nav-link"  href="#"><b>COLLEGES</b></a>
        </li>
        ):(
        //     <lisn >
        //     <a class="nav-link"  href="#"><b>DONT DISP COLLEGES</b></a>
        // </lisn>
        <>
        </>
        )}
        <li className='shome_nav_item'>
            <a class="nav-link"  href="/student/book/"><b>BOOKS</b></a>
        </li>
        <li className='shome_nav_item'>
            <a class="nav-link"  href="/student/exam/"><b>PRACTISE TEST</b></a>
        </li>
        <li className='shome_nav_item'>
            <a class="nav-link"  href="#"><b>COMPETITIVE EXAMS</b></a>
            {/* ITHU THEVA THERLA MOSTLY TIPS AND REVISIONNOTES AND VIDEOS PODALANUM ERUKEN */}
        </li>
        <li className='shome_nav_item'>
            <a class="nav-link"  href="/student/srevnotes/"><b>REVISION NOTES</b></a>
        </li>
        {/* NEWS NOT REQUIREED TO BE REMOVEd */}
        {/* <lisn>
            <a class="nav-link"  href="/student/news/"><b>NEWS</b></a>
        </lisn> */}
        {twelvegrade ? (
            <li>
            <a class="nav-link"  href="#"><b>COURSES</b></a>
        </li>
        ):(
            <>
            </>
        )}
        <li className='shome_nav_item'>
            <a class="nav-link"  href="/student/questionbank/"><b>QUESTION BANK</b></a>
        </li>
        <li className='shome_nav_item'>
            <a class="nav-link"  href="/"><b>HOME</b></a>
        </li>
        <li className='shome_nav_item'> 
            <Link to="/" className="navbar-links" onClick={logout}><b>LOGOUT</b></Link>
        </li>
    </ul>
    </div>
    );
}

export default Navbar;