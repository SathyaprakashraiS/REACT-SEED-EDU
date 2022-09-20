import React,{useState,useEffect, Component } from 'react';
import Navbar from '../navbar';
import './css/contacts.css';
import { GoogleLogout } from 'react-google-login';
import SNavbar from './snavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Contacts(){
  let history = useHistory();
  
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
    
    useEffect(() => {

    }, []);

      console.log(userdata)
      
          let center={
              marginLeft:'45%',
          };
return(
    
    <div className="main">
    <Navbar/>
    <div className="inmain">
    <h1 style={center}><b>|_o_|</b></h1>
    
    
    </div>
    
    </div>
    );
}

export default Contacts;