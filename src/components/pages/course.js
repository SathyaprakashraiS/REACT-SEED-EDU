import '../../App.css';
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
// import Dispcards from './display';
import './css/arts.css';
import GLogin from './log';
import Navbar from '../navbar';

function Course()
{
  const locdata = JSON.parse(localStorage.getItem('user'));
  const apilocdata = JSON.parse(localStorage.getItem('apiuser'));
  const userdata = JSON.parse(localStorage.getItem('theuser'));
  var apiavail=false;

  const { state } = ([])
  var authenticated=false;

  if(locdata!=null)
  {
    console.log("Authenticated")
    authenticated=true;
    console.log("api fetched userdata",apilocdata)
    //console.log("the signed in userdata is ",userdata)
    console.log("the signed in user is ",userdata.username)
  }
  else
  {
    console.log("Not Authenticated")
  }

  return(
    <div className="cpmain">
    <Navbar />
    <div>
      {authenticated ? (
        <>
        
        </>
      ) : (
        <p></p>
      )}
    </div>
    <div class="titlecontext"><b>DIFFERENT TYPES OF COURSES AVAILABLE IN INDIA</b></div>
    <div class="container">
  <div class="card-box">
    <div class="card-img">
      <a href="/courses/arts/"><img src="https://www.pursueit.ae/public/uploads/activity-feature-image/thumb/509991583590777.jpg" alt=""/></a>
    </div>
    <div class="card-content">
      <span><a href="/courses/arts/">ARTS</a></span>
    </div>

  </div>
  <div class="card-box">
    <div class="card-img">
      <a href="/courses/science/"><img src="https://leverageedu.com/blog/wp-content/uploads/2019/10/Medical-Science-Courses.jpg" alt=""/></a>
    </div>
    <div class="card-content">
      <span><a href="/courses/science/">SCIENCE</a></span>
    </div>

  </div>
  <div class="card-box">
    <div class="card-img">
      <a href="/courses/engineering/"><img src="https://static1.shine.com/l/m/images/blog/best_engineering_jobs_for_future.png" alt=""/></a>
    </div>
    <div class="card-content">
      <span><a href="/courses/engineering/">ENGINEERING</a></span>
    </div>
  </div>
  <div class="card-box">
    <div class="card-img">
      <a href="/courses/commerce/"><img src="https://otutu.com.ng/wp-content/uploads/2020/12/XkvnuzHaNQ.jpg" alt=""/></a>
    </div>
    <div class="card-content">
      <span><a href="/courses/commerce/">COMMERCE</a></span>
    </div>

  </div>
  <div class="card-box">
    <div class="card-img">
      <a href="/courses/procourse/"><img src="https://redsketch.in/wp-content/uploads/2021/03/Graphic-Design-Professional-Course-1024x651.jpeg" alt=""/></a>
    </div>
    <div class="card-content">
      <span><a href="/courses/procourse/">PROFESSIONAL COURSES</a></span>
    </div>

  </div>

  </div>
    </div>
    
  );
}

export default Course;