import React,{useState,useEffect, Component } from 'react';
import './thome.css';
import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Teacher(){
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
        if(userdata.is_staff == false)
        {
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
    <TNavbar/>
    <div className="inmain">
        <h1 style={center}><b>|_o_|</b></h1>
        <br/><br/><br/>
    </div>
</div>
    );
}

export default Teacher;
