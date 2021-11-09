import { Link } from 'react-router-dom';
import './snavbar.css';
import { GoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router';

function Navbar(){

    const logout = ()=>{
        localStorage.clear(); //for localStorage
        sessionStorage.clear(); //for sessionStorage
        window.location.reload(false);
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
    <>
    <ul>
        <li>
            <img class="profile" src={userdata.img} alt="not found"/>
            <h1 style="text-align: center;">{userdata.username}</h1>
        </li>
    
    <li>
    {/*  CHANGE HOVER COLOR TO f4f4f4 */}
        <b>HOME</b>
      </li>
      <li >
        <b>COLLEGES</b>
      </li>
      <li >
        <b>BOOKS</b>
      </li>
      <li >
        <b>EXAMS</b>
      </li>
        <li>
        <b>NEWS</b>
      </li>
      <li >
        <b>COURSES</b>
      </li>
      <li >
        <b>QUESTION BANK</b>
      </li>
      <li >
        <b>STUD PORTAL</b>
      </li>
      
  </ul>
    </>
    );
}

export default Navbar;
