import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
import './css/tutors.css';
import SNavbar from './snavbar';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Tutors(){
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
        if(userdata.is_staff == false){
            student=true
            console.log("student here")
        }
    }
    
    const [tutors,settutors] = useState([]);
    const [alltutors,setalltutors] = useState([]);

    async function fetchtutorslist(){
        var apiavail=false;
        var tutorslink=`http://127.0.0.1:8000/tutors-list/`+userdata.standard;
        const request = await fetch(tutorslink)
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
            settutors(data)
          })
          .catch((error) => {
            console.log("the error ",error)
          });
        }
    
        async function fetchalltutorslist(){
            var apiavail=false;
            var Atutorslink=`http://127.0.0.1:8000/Atutors-list/`;
            const request = await fetch(Atutorslink)
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
                setalltutors(data)
              })
              .catch((error) => {
                console.log("the error ",error)
              });
            }
      
    useEffect(() => {
        fetchtutorslist();
        fetchalltutorslist();
    }, []);
  
    console.log(userdata)
    let center=
    {
        marginLeft:'45%',
    };
    
  return(
      
      <div className="main">
      <SNavbar/>
      
      <div className="inmain">
      <h1 style={center}><b>|_o_|</b></h1>
      <p>TUTORS INTRESTED IN GIVING PERSONEL LECTURE FOR YOUR GRADE</p>
      {
                    tutors.map(item => (
                    <a key={item.id}>
                        {item.advertise?<>
                            <img className="bimg" src={item.img} />
                            <p><b>USERNAME:{item.username}</b></p>
                            <p><b>EMAIL:{item.email}</b></p>
                            <p><b>ABOUT:{item.status}</b></p>
                            <p><b>TUTOR FOR GRADE:{item.standard}</b></p>
                            {
                            item.contactnumber=="9876543210"?<>
                                <p><b>CONTACT NOT YET ADDED</b></p>
                            </>:<>
                                <p><b>CONTACT NUMBER:{item.contactnumber}</b></p>
                            </>
                            }
                            <p><a href={item.resume}><b>CLICK TO VIEW RESUME</b></a></p>
                            <br></br></>:<>
                            <img className="bimg" src={item.img} />
                            <p><b>USERNAME:{item.username}</b></p>
                            <p><b>ABOUT:{item.status}</b></p>
                            <p><b>TUTOR FOR GRADE:{item.standard}</b></p>
                            <br></br>
                        </>
                    }
                    </a>
                    ))
                
        }
        <p>ALL ARCHITECTS OF YOUR FUTURE</p>
        {
        alltutors.map(item => (
        <a key={item.id}>
            <img className="bimg" src={item.img} />
            <p><b>USERNAME:{item.username}</b></p>
            <p><b>ABOUT:{item.status}</b></p>
            <p><b>TUTOR FOR GRADE:{item.standard}</b></p>
            <br></br>
            </a>
            ))
        }
      </div>
      </div>
      );
  }

export default Tutors;