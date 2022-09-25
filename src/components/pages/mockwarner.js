import React,{useState,useEffect, Component } from 'react';

import { GoogleLogout } from 'react-google-login';
import axios from 'axios';
import SNavbar from './snavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import './mockwarner.css';
import { reduceHooks } from 'react-table';

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
        history.push("/student/attmock");
      }

      function goback(){
        localStorage.removeItem('mockid');
        localStorage.removeItem('mockname');
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
          let cap={
            color:'#FF0000',
          }
            
return(
    <>
    <div className="main">
    <SNavbar/>
    <div className="inmain">
    {/* <h1 style={center}><b>|_o_|</b></h1> */}
    <h1><b>MOCK WARNING</b></h1> 
    <div class="warntext">
      {
        <div className='warn_main'>
  <p><b style={cap}>M</b>ake sure you have a good internet connection to attend the exam</p>
  <p><b style={cap}>A</b>ttending the quiz from PC is advisable</p>
  <p><b style={cap}>O</b>nce the exam is started you can't navigate back or away from the browser</p>
  <p><b style={cap}>E</b>ach question holds 1 mark each</p>
  <p><b style={cap}>I</b>f facing any issues do press the report button immediatly</p>
  <p><b style={cap}>S</b>ubmit the exam before the time runs out, Failing to submit then the quiz gets auto-submitted</p>
  <p><b style={cap}>T</b>rying to alternate between pages closes the exam automatically</p>
  <p><b style={cap}>P</b>ress start button to start the exam </p>
  <button onClick={() => goback()}>GO BACK</button>
  <button onClick={() => accept()}>ACCEPT</button>
  </div>
      }
</div>
    <br/><br/><br/>
    </div>
    </div>
    </>
    );
}

export default Qwarn;