import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../navbar';
import himage from "./images/homepage.jpg"

import './css/home.css'
import { FaRocket } from 'react-icons/fa';
import { Link, Redirect, useHistory } from 'react-router-dom';

const Home = ()=>{
  const userdata = JSON.parse(localStorage.getItem('theuser'));
  let history = useHistory();



  console.log("working")
  function GenT(){
 
      let ndiv = document.querySelector(".hsec2")
      let butt = document.querySelector(".gs")
      let main = document.querySelector(".hmain")
      console.log(butt)
      butt.addEventListener("click", () => {
        ndiv.scrollIntoView()
      });
  
  }





  


  
  
  
  return (
    <div className="outer"> 
      <Navbar/>
    <div className='hmain_outer'>
  

     <div className="hmain">
    
     
       {/* {userdata ? <p>hello {userdata.username}</p>:<p>hello</p>} */}
      {/* {userdata.teacher ? <p>qqq</p>:<p>aaa</p>} */}
      <div className="home_text_main">
     
        <div className='hm_inner'>
       
        <h1 className='home_h'>SEED - CONTAINS EVERY INFOMATION FOR YOUR STUDIES !</h1>
        
        <div className='buildup_text'>
          <p >Contains Everyrthing ...From notes to videos...Quizes to mock Exams ...Key QP to Exam Details...</p>
          <button  className="gs"  onClick={(e)=>GenT()}>GET STARTED</button>
        </div>
        
        </div>
     
      </div>
      <div className='home_image'>
        {/* <img src={himage}></img> */}
        <img src="https://img.freepik.com/free-vector/girl-with-flying-books-with-magic-glow-sparkles-vector-cartoon-fantasy-illustration-happy-chi_107791-7513.jpg?w=740&t=st=1663516832~exp=1663517432~hmac=92797e0040e80ae8e73c10347ceb838520431c6ec2c40b84beb73aa831497c30"></img>
      </div>
    </div>
    <div className='hsec2' id="sec2">
      <div className='sec2_image'>
        <img src="https://media.istockphoto.com/vectors/university-buildingeducation-studentcity-landscape-house-building-vector-id1045222274?k=20&m=1045222274&s=612x612&w=0&h=CloR-3d1YS2p0ScbdEYDMth3YOHOWNA8Vx_Nx8TM8_8="></img>
      </div>
      <div className='sec2_text'>
        <h2>SEARCH FOR COLLEGES</h2>
        <p>Find all the colleges and university in india ...We contains almost all colleges which are recognized by Government
          .Search colleges based on  city or state</p>
        <img src="https://i.gifer.com/origin/9e/9e32144156d467322fd041114e3e0aac.gif"></img>
        
      </div>
    </div>

    <div className='hsec3' >
      <div className='h3_c1'>
      <div className='h3c1_img'>
          <img src="https://img.freepik.com/free-vector/youtube-player-device-with-flat-design_23-2147844065.jpg?w=740&t=st=1663611566~exp=1663612166~hmac=0f4e8bb177961b9297094d227d18d9407944a58fe3709d714d3d66f8b9bfec6b"></img>
        </div>
        <div className='h3c1_text'>
          <h1>VIDEOS</h1>
          <p>VIEW TOP SUBJECT VIDEOS IN YOUTUBE</p>
          <button className='lbt' onClick={()=>{history.push("/video")}}><FaRocket/></button>
        </div>
      </div>
      <div className='h3_c2'>
        <div className='h3c2_img'>
          <img src="https://img.freepik.com/free-vector/thoughtful-woman-with-laptop-looking-big-question-mark_1150-39362.jpg?w=740&t=st=1663611612~exp=1663612212~hmac=45c826c0d186004f92b451d2acf98a59b415fcfbbd614141fbd13eaac5eb98ce"></img>
        </div>
        <div className='h3c2_text'>
          <h1>QUIZ</h1>
          <p>ATTEND Quizes</p>
          <button className='lbt'><FaRocket/></button>
        </div>
      
      </div>
      <div className='h3_c3'>
      <div className='h3c3_img'>
          <img src="https://img.freepik.com/free-vector/giant-check-list_23-2148087771.jpg?w=740&t=st=1663610602~exp=1663611202~hmac=35452df51897b701d0fbfda5f1412183ea6d25282945cc0979d3b0c1e235795f"></img>
        </div>
        <div className='h3c3_text'>
          <h1>EXAM</h1>
          <p>CREATE AND ATTEND EXAMS</p>
          <button className='lbt'><FaRocket/></button>
        </div>
        
      </div>
      
    </div>
    <div className='hsec4'>

      <div className='h4c'>
        <div className='h4t_image'>
        <img src="https://img.freepik.com/free-vector/man-teacher-classroom_24877-50508.jpg?w=740&t=st=1663682979~exp=1663683579~hmac=dee9d7e1e9675084678c18d39ec13e863eab1db703432fa3703e2d31f224d521"></img>
        </div>
        <div className='h4_teacher'>
          <h1>TEACHER LOGIN</h1>
          <p>ONLY VERIFIED TEACHERS CAN ENTER TEACHERS PORTAL</p>
          <p>TEACHERS CAN CREATE QUIZ,EXAMS</p>
          <p>UPLOAD MATERIALS</p>
          <p>EVALUATE THE EXAM PAPERS AND PUBLISH THE MARKS</p>
        </div>
        <div className='h4circle'><p>PORTAL</p></div>
        <div className='h4_student'>
          <h1>STUDENT LOGIN</h1>
          <p>ANY STUDENT WITH GOOGLE ACCOUNT CAN LOGIN</p>
          <p>AFTER LOGIN, CAN ATTEND QUIZ AND EXAMS</p>
          <p>GAIN ACCESS TO ALL MATERIALS</p>
          <p>USE COMMUNITY CHAT </p>
        </div>
        <div className='h4s_image'>
        <img src="https://img.freepik.com/free-vector/focused-tiny-people-reading-books_74855-5836.jpg?w=740&t=st=1663683057~exp=1663683657~hmac=91b38e0dd5799a2d009ecc66b33bbc9eb5769e00e097aab70cba2b909b1d3b6d"></img>
        </div>
      </div>
    </div>
    {/* <footer>
      <div className='foot_main'>
        <div className='footer_info'>

        </div>
        <div className='footer_social'></div>
        <div className='copyrights'></div>
      </div>
    </footer> */}
    </div>
 
    </div>
  )
}

export default Home 
