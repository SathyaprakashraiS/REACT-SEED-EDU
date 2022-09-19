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
                    profdetails.map(item => (
                    <a key={item.id}>
                        <img className="bimg" src={item.img} />
                        <p><b>{item.username}</b></p>
                        <p><b>{item.email}</b></p>
                        <p><b>{item.status}</b></p>
                        <p><b>{item.hide}</b></p>
                        <p><b>{item.standard}</b></p>
                        <p><b>{item.resume}</b></p>
                        <button onClick={()=>goback()}>Go back</button>
                        <button onClick={()=>editprofile()}>edit profile</button>
                        <br></br>
                    </a>
                    ))
                
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
