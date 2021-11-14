import '../../App.css';
import React,{useState,useEffect, Component, useCallback } from 'react';

import axios from 'axios';
// import Dispcards from './display';
import './quizans.css';
import GLogin from './log';
import SNavbar from './snavbar';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Qans()
{
    let history = useHistory();
  const [quizans,setquizans] = useState([]);
  const [api,setapi] = useState([false]);
  const [loading,setloading] = useState(false);
  
  const locdata = JSON.parse(localStorage.getItem('user'));
  const apilocdata = JSON.parse(localStorage.getItem('apiuser'));
  const userdata = JSON.parse(localStorage.getItem('theuser'));
  const quizid = JSON.parse(localStorage.getItem('quizid'));
  var apiavail=false;

//   const { state } = this.props.location
  var authenticated=false;
  var papersfetched=false;
  const papid=JSON.parse(localStorage.getItem('paperid'));
  
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
    var thestring='http://127.0.0.1:8000/quizans-list/'+quizid+'/'
    console.log("THE STRING IS ",thestring)
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
        setquizans(data)
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

  let content = {
    marginLeft: '220px',
    paddingBottom:'100px',
    // width: '250px',
    // height: '250px',
    backgroundColor: 'yellow',
  };
  
  return(
    <div className="quizmain">
    <SNavbar />
    <div>
      {authenticated ? (
        <>
        </>
      ) : (
        <p>Login panra dei</p>
      )}
    </div>
    <div className="quest">
    <h1>{quizid} QUIZ ANSWERS</h1>
    {apiavail && papid ? (
        <>
        {
      quizans.map(item => (
      <a key={item.id}>
        <b>QUESTION: </b><p>{item.cquestion}</p>
        <p>{item.coption1}</p>
        <p>{item.coption2}</p>
        <p>{item.coption3}</p>
        <p>{item.coption4}</p>
        <b>CORRECT OPTION: </b><p>{item.canswer}</p>
        {/* {item.paper} */}
        <br></br><br></br>
      </a>
      ))
  
      }
        </>
      ) : (
        <>
        { history.push("/student") }
        </>
      )}
      </div>
    </div>
    
  );
}

export default Qans;