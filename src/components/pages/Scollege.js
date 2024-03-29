import '../../App.css';
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
// import Dispcards from './display';
import './css/Acollege.css';
import GLogin from './log';
import Navbar from '../navbar';
import AllCollege from '../structures/AllCollege';

function Scollege()
{
  const [college,setcollege] = useState([]);
  const [api,setapi] = useState([false]);
  const [loading,setloading] = useState(false);
  
  const locdata = JSON.parse(localStorage.getItem('user'));
  const apilocdata = JSON.parse(localStorage.getItem('apiuser'));
  const userdata = JSON.parse(localStorage.getItem('theuser'));
  var apiavail=false;

  const { state } = ([])
  var authenticated=false;

  // try{
  //   state = this.props.location
  //   authenticated=true
  // }
  // catch{

  // }

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
    const request = await fetch(`http://127.0.0.1:8000/scollege-list/`)
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
        setcollege(data)
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
    <>
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
    <a href="/colleges/" >Go back</a>
    <h1>STATEWISE COLLEGES IN INDIA</h1>
    <div className="coverpage">
    </div>
    {apiavail ? (
        <><p>{api}</p>
          <div className="header">
       <p>Name</p>
       <p>City</p>
       <p>State</p>
       <p>Rating</p>
       </div>
      {
      college.map(item => (
      <a key={item.id}>
       
      <AllCollege data={item} name={item.name} city={item.city} state={item.state} rating={item.rating}/>
      </a>
      ))
}

        </>
      ) : (
        <p>no api to fetch from :(</p>
      )}
      </div>
    </>
    
  );
}

export default Scollege;