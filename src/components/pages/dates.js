import '../../App.css';
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
// import Dispcards from './display';
import './dates.css';
import GLogin from './log';
import Navbar from '../navbar';

function Date()
{
  const [date,setdate] = useState([]);
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
    const request = await fetch(`http://127.0.0.1:8000/dates-list/`)
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
        setdate(data)
        setloading(false)
        setapi(true)
        // console.log("the data rec",data)
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
    <>
    
    <Navbar />
    <div>
      {authenticated ? (
        <>
        {/* <p>username is {userdata.username}</p>
        <p>username is {userdata.standard}</p>
        <img src={userdata.img} alt="not found"/> */}
        </>
      ) : (
        <p>Login panra dei</p>
      )}
    </div>
    {apiavail ? (
        <><p>{api}</p>
        <section className="timeline">
      {
      date.map(item => (
      <a key={item.id}>
        <article>
    <div className="inner">
    <h2 className="ename">{item.event_name}</h2>
      <div className="date">
        
         <div className="od"><p>{item.Date}</p></div>
     
      </div>
      
      <p className="desc">{item.desc}</p>
    </div>
  </article>
      </a>
      ))
      }
    </section>
        </>
      ) : (
        <p>no api to fetch from :(</p>
      )}
    </>
    
  );
}

export default Date;