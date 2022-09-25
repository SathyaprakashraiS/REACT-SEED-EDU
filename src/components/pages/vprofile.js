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
      
            <div className="vp_outer"> 
                <Navbar/>
                {/* <div className="vp_main">
                <p>view profile</p>
                </div> */}
                
                {
                userdata.teacher=false?<>
                <div className="sbox">
                  <p>STUDENT PROFILE</p>
                  
                  {
                    profdetails.map(item => (
                      <div className='vp_main'>
                    <a key={item.id}>
                      <div className='vp_items'>
                        <img className="bimg" src={item.img} />
                      </div>
                      <div className='vp_items'>
                        <p><b>USERNAME:{item.username}</b></p>
                      </div>
                      <div className='vp_items'>  
                        <p><b>EMAIL:{item.email}</b></p>
                      </div>
                      <div className='vp_items'>
                      <p><b>ABOUT:{item.status}</b></p>
                      </div>
                      <div className='vp_items'>
                      {
                          item.hide?<>
                            <b><p>HIDE STATUS:ENABLED</p></b>
                          </>:<>
                            <b><p>HIDE STATUS:DISABLED</p></b>
                          </>
                        }
                      </div>
                      <div className='vp_items'>
                      <p><b>GRADE:{item.standard}</b></p>
                      </div>
                      <div className='vp_items'>
                      {
                          item.needassist?<> 
                            <p><b>REQUEST TUTORING:ENABLED</b></p>
                          </>:
                          <>
                            <p><b>REQUEST TUTORING:DISABLED</b></p>
                          </>
                        }
                      </div>
                      <div className='vp_items'>
                      {
                          item.contactnumber=="9876543210"?<>
                            <p><b>CONTACT NOT YET ADDED</b></p>
                          </>:<>
                            <p><b>CONTACT NUMBER:{item.contactnumber}</b></p>
                          </>
                        }
                      </div>
                      <div className='vp_items'>
                      <button onClick={()=>goback()}>Go back</button>
                      </div>
                      <div className='vp_items'>
                      <button onClick={()=>editprofile()}>edit profile</button>
                      </div>
                
                    </a>
                    </div>
                    ))
                
                }
                  
           
                </div>
                  </>
                  :
                  <div className="tbox">
                  {/* <p>TEACHER PROFILE</p> */}
                 
                  {
                    profdetails.map(item => (
                      
                    <a key={item.id}>
                      <div className='vp_main'>
                      <div className='vp_image'>
                      <img className="bimg" src={item.img} />
                      </div>
                      <div className='vp_item_main'>
                      <div className='vp_items'>
                      <p><b>NAME:{item.username}</b></p>
                      </div>
                      <div className='vp_items'>
                      <p><b>MAIL:{item.email}</b></p>
                      </div>
                      <div className='vp_items'>
                      <p><b>ABOUT:{item.status}</b></p>
                      </div>
                      <div className='vp_items'>
                      {
                          item.hide?<>
                            <b><p>HIDE STATUS:ENABLED</p></b>
                          </>:<>
                            <b><p>HIDE STATUS:DISABLED</p></b>
                          </>
                        }
                      </div>
                      <div className='vp_items'>
                      <p><b>GRADE:{item.standard}</b></p>
                      </div>
                      <div className='vp_items'>
                      {
                          item.advertise?<>
                            <p><b>ADVERTISE:ENABLED</b></p>
                          </>:
                          <>
                            <p><b>ADVERTISE:DISABLED</b></p>
                          </>
                        }
                      </div>
                      <div className='vp_items'>
                      {
                          item.contactnumber=="9876543210"?<>
                            <p><b>CONTACT NOT YET ADDED</b></p>
                          </>:<>
                            <p><b>CONTACT NUMBER:{item.contactnumber}</b></p>
                          </>
                        }
                      </div>
                      <div className='vp_items'>
                      <p><a href={item.resume}><b>CLICK TO VIEW RESUME</b></a></p>
                      </div>
                      <div className='vp_items'> 
                      <button onClick={()=>goback()}>Go back</button>
                      </div>
                      <div className='vp_items'>
                      <button onClick={()=>editprofile()}>edit profile</button>
                      </div>
                      </div>
                    
                        
                        
                       
                       
                       
                       
                       
                       
                      
                      </div>  
                
                    </a>
                  
                    ))
                
                }
                
                 
                </div>
                
                }
                
            </div>
       :
        <>
            {pushout()}
        </>
    }
    </>
  )
}

export default Vprofile
