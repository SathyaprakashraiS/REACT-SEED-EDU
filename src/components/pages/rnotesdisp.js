import '../../App.css';
import React,{useState,useEffect, Component, useCallback } from 'react';

import axios from 'axios';
// import Dispcards from './display';
import './css/rnotesdisp.css';
import GLogin from './log';
import Navbar from '../navbar';
import { Link, Redirect,useHistory } from 'react-router-dom';

function Rnotesdisp()
{
  let history = useHistory();
  const [note,setnote] = useState([]);
  const [api,setapi] = useState([false]);
  const [loading,setloading] = useState(false);
  
  const locdata = JSON.parse(localStorage.getItem('user'));
  const apilocdata = JSON.parse(localStorage.getItem('apiuser'));
  const userdata = JSON.parse(localStorage.getItem('theuser'));
  var apiavail=false;

//   const { state } = this.props.location
  var authenticated=false;
  var papersfetched=false;
  const notesid=JSON.parse(localStorage.getItem('notesid'));
  
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
    var thestring='http://127.0.0.1:8000/rnotes-list/'+notesid+'/'
    const request = await fetch(thestring)
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
        setnote(data)
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
        <p>Login panra dei</p>
      )}
    </div>
    <div className="centertext">
    <h1>QUESTION PAPERS</h1>
    </div>
    {apiavail && notesid ? (
        <>
        {
      note.map(item => (
        <a key={item.id}>
        <b>HERE THE PDF MUST BE DISPLAYED FOR NOW DETAILS ALONE IS DISPLAYED</b><br></br>
        <b>{item.title}</b><br></br>
        <b>{item.sub}</b><br></br>
        <b>{item.grade}</b>
        {/* {item.file} */}
        <br></br>
      </a>
      ))
  
      }
        </>
      ) : (
        <>
        {history.push("/revnotes")}
        </>
      )}
    </>
    
  );
}

export default Rnotesdisp;