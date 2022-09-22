import React,{useState,useEffect, Component } from 'react';
import './thome.css';
import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { FaBullseye, FaCogs, FaSteam } from 'react-icons/fa';

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
    function assespapers()
    {
        history.push("/teacher/tapapers/");
    }
    function crudchats()
    {
        history.push("/teacher/chatlist/");
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
        marginLeft:'50%',
    };
    let centerlol={
        marginLeft:'45%',
    };

return(

<div className="main">
    <TNavbar/>
    <div className="inmain">
        <h1 style={center}><b>TEACHER PORTAL</b></h1>
        <div className='t_tasks'>
            <div className='t_books'>
                <div className='t_in'>
                <h1>BOOKS</h1>
                <p>MANAGE BOOKS</p>
                <button onClick={() => crudbook()}>MANAGE <FaCogs className='t_icon'/></button>
                </div>
               
            </div>
            <div className='t_exam'>
            <div className='t_in'>
            <h1>EXAMS</h1>
                <p>display exams available</p>
                <button onClick={() => crudexam()}>MANAGE <FaCogs className='t_icon'/></button>
            </div>
              
            </div>
            <div className='t_qpaper'>
            <div className='t_in'>
            <h1>QP</h1>
                    <p>display questionpapers available</p>
                    {/* <p>question paper is displayed to all viewrs and student but exams papers are only for signed in students</p> */}
                    <button onClick={() => crudqpaper()}>MANAGE <FaCogs className='t_icon'/></button>
            </div>
                   
            </div>
            <div className='t_quiz'>
                <div className='t_in'>
                <h1>QUIZ</h1>
                    <p>edit quiz</p>
                    <button onClick={() => crudquiz()}>MANAGE <FaCogs className='t_icon'/></button>
                </div>
               
            </div>
            <div className='t_asses'>
            <div className='t_in'>
                <h1>ASSES PAPERS</h1>
                <p>ASSES STUDENTS PAPER</p>
                <button onClick={() => assespapers()}>MANAGE <FaCogs className='t_icon'/></button>
            </div>
                
            </div>
            <div className='t_course'>
                <div className='t_in'>
                <h1>COURSES</h1>
                <p>display all available courses</p>
                <button onClick={() => crudcourses()}>MANAGE <FaCogs className='t_icon'/></button>
                </div>
               
                
            </div>
            <div className='t_chat'>
                <div className='t_in'>
                <h1>CHAT</h1>
                <p>create delete or modify a chat community</p>
                <button onClick={() => crudchats()}>MANAGE <FaCogs className='t_icon'/></button>
                </div>
               
           
            </div>
        </div>
    </div>
</div>
    );
}

export default Teacher;
