import { Link } from 'react-router-dom';
import './tnavbar.css';
import { GoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router';
import {FaBars}  from "react-icons/fa";
import { useState } from 'react';

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
      const [tog,settog] =useState(0)

      const tognav = () =>{
        let ndiv = document.querySelector(".thome_nav_tog")
        let nicon = document.querySelector(".thome_nav_icon")
        let snav = document.querySelector(".thome_nav")
      
        if(tog===0){
          snav.classList.add("show_tnav")
          nicon.style.transform  = "rotate(90deg)"
          settog(1)
        }
        else if(tog===1){
            snav.classList.remove("show_tnav")
            nicon.style.transform  = "rotate(180deg)"
            settog(0)
        }
      }
return(

    <div>
        <div className='thome_nav_tog' onClick={tognav}><FaBars className="thome_nav_icon"/></div>
        <ul className='thome_nav'>
        <li className='thome_nav_item'>
            <div className='t_imgdiv'><img className="tprofile" src={userdata.img} onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="https://sportshub.cbsistatic.com/i/2021/12/22/4960c882-7f88-4de6-be05-14cf8138215f/doctor-strange-2-trailer-evil-doctor-strange-supreme-theories.jpg";
  }}/></div>
            
        </li>
        <li className='thome_nav_item'>
            <h1>{userdata.username}</h1>
        </li>
        <li className='thome_nav_item'>
            <a class="nav-link"  href="/teacher/"><b>TEACHER PORTAL</b></a>
        </li>
        <li className='thome_nav_item'>
            <a class="nav-link"  href="/teacher/books/"><b>BOOKS</b></a>
        </li>
        <li className='thome_nav_item'>
            <a class="nav-link"  href="/teacher/exams/"><b>EXAMS</b></a>
        </li>
        <li className='thome_nav_item'>
            <a class="nav-link"  href="/teacher/quiz/"><b>QUIZ</b></a>
        </li>
        <li className='thome_nav_item'>
            <a class="nav-link"  href="/teacher/tapapers/"><b>ASSES PAPERS</b></a>
        </li>
        <li className='thome_nav_item'>
            <a class="nav-link"  href="/teacher/course/"><b>COURSES</b></a>
        </li>
        <li className='thome_nav_item'>
            <a class="nav-link"  href="/teacher/qpaper/"><b>QUESTION BANK</b></a>
        </li>
        <li className='thome_nav_item'>
            <a class="nav-link"  href="/"><b>HOME</b></a>
        </li>
        <li className='thome_nav_item'>
            <Link to="/" className="navbar-links" onClick={logout}><b>LOGOUT</b></Link>
        </li>
        </ul>
    </div>
    );
}

export default Navbar;