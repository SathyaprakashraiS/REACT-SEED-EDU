import React,{useState,useEffect, Component } from 'react';
import './thome.css';
import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Teacher(){
  let history = useHistory();
  localStorage.removeItem('modquiz');
  const logout = ()=>{
      localStorage.clear(); //for localStorage
      sessionStorage.clear(); //for sessionStorage
      // window.location.reload(false);
      return(
        <Redirect to="/"/>
        )
    }

    function crudbook()
    {
        history.push("/teacher/books/");
    }
    function crudexam()
    {
        history.push("/teacher/exams/");
    }
    function crudqpaper()
    {
        history.push("/teacher/qpaper/");
    }
    function crudquiz()
    {
        history.push("/teacher/quiz/");
    }
    function crudcourses()
    {
        history.push("/teacher/course/");
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
        marginLeft:'38%',
    };
    let centerlol={
        marginLeft:'45%',
    };

return(

<div className="main">
    <TNavbar/>
    <div className="inmain">
        <h1 style={centerlol}><b>|_o_|</b></h1>
        <h1 style={center}><b>TEACHER PORTAL</b></h1>
        <br/><br/><br/>
        <h1>BOOKS</h1>
        <button onClick={() => crudbook()}>settings icon card</button>
        <p>thinking to add cards where it shows already present things but a setting icon erukura oru card erukum when pressed goes to new page where all crud operation for that particular tag</p>
        <h1>EXAMS</h1>
        <p>display exams available</p>
        <button onClick={() => crudexam()}>settings icon card</button>
        <h1>QUESTION PAPER</h1>
        <p>display questionpapers available</p>
        <p>question paper is displayed to all viewrs and student but exams papers are only for signed in students</p>
        <button onClick={() => crudqpaper()}>settings icon card</button>
        <h1>QUIZ</h1>
        <p>edit quiz</p>
        <button onClick={() => crudquiz()}>settings icon card</button>
        <h1>ASSES PAPERS</h1>
        <h1>COURSES</h1>
        <p>display courses that are added by user or display all available courses</p>
        <button onClick={() => crudcourses()}>settings icon card</button>
    </div>
</div>
    );
}

export default Teacher;
