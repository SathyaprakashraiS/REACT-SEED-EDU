import React,{useState,useEffect, Component } from 'react';
import './shome.css';
import { GoogleLogout } from 'react-google-login';
import axios from 'axios';
import SNavbar from './snavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

function Qwarn(){
  let history = useHistory();

    const logout = ()=>{
        localStorage.clear(); //for localStorage
        sessionStorage.clear(); //for sessionStorage
        // window.location.reload(false);
        return(
            <Redirect to="/"/>
        )
      }
      const userdata = JSON.parse(localStorage.getItem('theuser'));
      const mockid = JSON.parse(localStorage.getItem('mockid'));
      const mockname = JSON.parse(localStorage.getItem('mockname'));

      function accept(){
        history.push("/student/attquiz");
      }

      function goback(){
        localStorage.removeItem('quizid');
        history.push("/student");
      } 
 

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
     
      console.log(userdata)
          let center={
              marginLeft:'45%',
          };
            
return(
    <>
    <div className="main">
    <SNavbar/>
    <div className="inmain">
    <h1 style={center}><b>|_o_|</b></h1>
    <h1><b>QUIZ WARNING</b></h1>
    <div className="qmain">
    {
        <>
        <button onClick={() => accept()}>ACCEPT</button>
        <button onClick={() => goback()}>GO BACK</button>
        </>
    }
    </div>
    <div class="warntext">
    <ul>
  <li><p><b>M</b>ake sure you have a good internet connection to attend the exam</p></li>
  <li><p><b>A</b>ttending the quiz in PC is advisable</p></li>
  <li><p><b>O</b>nce the exam is started you can't navigate back</p></li>
  <li><p><b>E</b>ach question holds 1 mark each</p></li>
  <li><p><b>I</b>f facing any issues do press the report button immediatly</p></li>
  <li><p><b>S</b>ubmit the exam before the time runs out, Failing to submit then the form gets auto-submitted</p></li>
  <li><p><b>T</b>rying to alternate between pages closes the exam automatically</p></li>
  <li><p><b>P</b>ress start button to start the exam </p></li>
</ul>
</div>
    <br/><br/><br/>
    </div>
    </div>
    </>
    );
}

export default Qwarn;