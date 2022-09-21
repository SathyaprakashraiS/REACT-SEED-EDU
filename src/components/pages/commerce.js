import '../../App.css';
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
// import Dispcards from './display';
import './css/arts.css';
import GLogin from './log';
import Navbar from '../navbar';
import ArtStructure from '../structures/ArtStructure';

function Acollege()
{
  const [course,setcourse] = useState([]);
  const [api,setapi] = useState([false]);
  const [loading,setloading] = useState(false);
  
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

  async function fetchData() {
    var apiavail=false;
    const request = await fetch(`http://127.0.0.1:8000/commercecourse-list/`)
      .then(response => {
        if(response.ok)
      {
        console.log("here")
        console.log(apiavail)
        apiavail=true;
        return response.json(); 
      }
      else{
        console.log("im not here")
        console.log(apiavail)
      }
    })
      .then(data => {
        setcourse(data)
        setloading(false)
        setapi(true)
      })
      .catch((error) => {
        console.log("the error ",error)
        setapi(false)
      });
    }

useEffect(() => {
  fetchData();
}, []);
if(api)
  {
    console.log("fetched from api")
    apiavail=true;
    console.log(apiavail)
  }
  else
  {
    console.log("treid fetching api not available")
    apiavail=false;
    console.log(apiavail)
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

    
    <div className="centertext">
    <a href="/courses/">Go back</a>
    <h1>COMMERCE COURSE</h1>
    </div>
    <div className="header">
    <h2>course</h2>
    <h2>duration</h2>
    <h2>About</h2>
    </div>
    <div className="comcont">
    {apiavail ? (
        <><p>{api}</p>
      {
      course.map(item => (
      <a key={item.id}>
         <ArtStructure name={item.name} duration={item.duration} desc={item.desc}/> 
      {/* {item.name}
      {item.duration}
      {item.desc} */}
      </a>
      ))
    }
   
        </>
      ) : (
        <p>no api to fetch from :(</p>
      )}
       </div>
    </div>
    
  );
}

export default Acollege;