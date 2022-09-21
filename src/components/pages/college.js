import '../../App.css';
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
// import Dispcards from './display';
import './css/college.css';
import GLogin from './log';
import Navbar from '../navbar';

function College()
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
    <div className="chome">
    <Navbar />
    <div>
      {authenticated ? (
        <>
        
        </>
      ) : (
        <p></p>
      )}
    </div>
    <div class="titlecontext"><b>DIFFERENT COLLEGE TYPES IN INDIA</b></div>
    
<div class="container">
  <div class="card-box">
    <div class="card-img">
      <a href="/colleges/allcolleges/"><img src="https://images.shiksha.com/mediadata/images/1490072168phpQ9v9PO_g.jpg" alt=""/>
    </a>
    </div>
    <div class="card-content">
      <span><a href="/colleges/allcolleges/" >ALL COLLEGES</a></span>
    </div>
  </div>

  <div class="card-box">
    <div class="card-img">
      <a href="/colleges/topcolleges/"><img src="https://www.businessbecause.com/uploads/default/news/images/1566911208.png" alt=""/>
    </a></div>
    <div class="card-content">
      <span><a href="/colleges/topcolleges/" >TOP COLLEGES</a></span>
    </div>
  </div>

  <div class="card-box">
    <div class="card-img">
      <a href="/colleges/degreecolleges/"><img src="https://printabletemplates.com/wp-content/uploads/2017/12/graduation-certificate-12.jpg" alt=""/></a>
    </div>
    <div class="card-content">
      <span><a href="/colleges/degreecolleges/" >DEGREE BASED COLLEGES</a></span>
    </div>
  </div>
 
  <div class="card-box">
    <div class="card-img">
      <a href="/colleges/statecolleges/"><img src="https://elements-video-cover-images-0.imgix.net/files/208091192/India+Map+Preview+590x332.jpg?auto=compress&crop=edges&fit=crop&fm=jpeg&h=800&w=1200&s=620bc62ed3e6a929dbe0ebe33836db03" alt=""/></a>
    </div>
    <div class="card-content">
      <span><a href="/colleges/statecolleges/" >STATE WISE COLLEGES</a></span>
    </div>
  </div>

  <div class="card-box">
    <div class="card-img">
      <a href="/colleges/citycolleges/"><img src="https://www.cioandleader.com/sites/default/files/styles/article_image/public/CITY.jpg?itok=nJT8stE0" alt=""/></a>
    </div>
    <div class="card-content">
      <span><a href="/colleges/citycolleges/" >NOTICABLE CITY WITH BEST COLLEGES</a></span>
    </div>
  </div>

  <div class="card-box">
    <div class="card-img">
      <a href="/colleges/coursecolleges/"><img src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt=""/></a>
    </div>
    <div class="card-content">
      <span><a href="/colleges/coursecolleges/" >COURSE BASED COLLEGES</a></span>
    </div>
  </div>
</div>
    
    </div>
    
  );
}

export default College;