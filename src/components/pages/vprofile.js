import React,{useState,useEffect, Component } from 'react';
import Navbar from '../navbar';
import './css/vprofile.css'
import axios from 'axios';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Vprofile() {
    const [profdetails,setprofdetails] = useState([]);
    const userdata = JSON.parse(localStorage.getItem('theuser'));
    function goback()
    {
        history.push("/");
    }
    function editprofile()
    {
        history.push("/editprofile")
    }
    async function fetchuserdata(stand) {
        var apiavail=false;
        var proflink=`http://127.0.0.1:8000/viewprofile/`+userdata.email;
        const request = await fetch(proflink)
          .then(response => {
            if(response.ok)
          {
            console.log("here")
            apiavail=true;
            return response.json(); 
          }
          else{
            console.log("im not here")
          }
        })
          .then(data => {
            setprofdetails(data)
            console.log("ithuthanda messages",setprofdetails)
          })
          .catch((error) => {
            console.log("the error ",error)
          });
        }
    let history = useHistory();
    function pushout()
    {
        history.push("/");
    }
  useEffect(() => {
    fetchuserdata();
}, []);

  return (
    
    <>
    {userdata?
        <>
            <div className="outer"> 
                <Navbar/>
                <div className="hmain">
                <p>view profile</p>
                </div>
                
                {
                userdata.teacher==false?<>
                <div className="sbox">
                  <p>STUDENT PROFILE</p>
                  {
                    profdetails.map(item => (
                    <a key={item.id}>
                        <img className="bimg" src={item.img} />
                        <p><b>USERNAME:{item.username}</b></p>
                        <p><b>EMAIL:{item.email}</b></p>
                        <p><b>ABOUT:{item.status}</b></p>
                        {
                          item.hide?<>
                            <b><p>HIDE STATUS:ENABLED</p></b>
                          </>:<>
                            <b><p>HIDE STATUS:DISABLED</p></b>
                          </>
                        }
                        <p><b>GRADE:{item.standard}</b></p>
                        {
                          item.needassist?<>
                            <p><b>REQUEST TUTORING:ENABLED</b></p>
                          </>:
                          <>
                            <p><b>REQUEST TUTORING:DISABLED</b></p>
                          </>
                        }
                        {
                          item.contactnumber=="9876543210"?<>
                            <p><b>CONTACT NOT YET ADDED</b></p>
                          </>:<>
                            <p><b>CONTACT NUMBER:{item.contactnumber}</b></p>
                          </>
                        }
                        <button onClick={()=>goback()}>Go back</button>
                        <button onClick={()=>editprofile()}>edit profile</button>
                        <br></br>
                    </a>
                    ))
                
                }
                </div>
                  </>
                  :<>
                  <br/>
                  <div className="tbox">
                  <p>TEACHER PROFILE</p>
                  {
                    profdetails.map(item => (
                    <a key={item.id}>
                        <img className="bimg" src={item.img} />
                        <p><b>NAME:{item.username}</b></p>
                        <p><b>MAIL:{item.email}</b></p>
                        <p><b>ABOUT:{item.status}</b></p>
                        {
                          item.hide?<>
                            <b><p>HIDE STATUS:ENABLED</p></b>
                          </>:<>
                            <b><p>HIDE STATUS:DISABLED</p></b>
                          </>
                        }
                        <p><b>GRADE:{item.standard}</b></p>
                        {
                          item.advertise?<>
                            <p><b>ADVERTISE:ENABLED</b></p>
                          </>:
                          <>
                            <p><b>ADVERTISE:DISABLED</b></p>
                          </>
                        }
                        {
                          item.contactnumber=="9876543210"?<>
                            <p><b>CONTACT NOT YET ADDED</b></p>
                          </>:<>
                            <p><b>CONTACT NUMBER:{item.contactnumber}</b></p>
                          </>
                        }
                        <p><a href={item.resume}><b>CLICK TO VIEW RESUME</b></a></p>
                        <button onClick={()=>goback()}>Go back</button>
                        <button onClick={()=>editprofile()}>edit profile</button>
                        <br></br>
                    </a>
                    ))
                
                }
                </div>
                  </>
                }
                
            </div>
        </>:
        <>
            {pushout()}
        </>
    }
    </>
  )
}

export default Vprofile
