import '../../App.css';
import React,{useState,useEffect, Component, useCallback } from 'react';

import axios from 'axios';
// import Dispcards from './display';
import './css/quesbank.css';
import GLogin from './log';
import Navbar from '../navbar';
import { Link, Redirect,useHistory } from 'react-router-dom';

function Quesbank()
{
  let history = useHistory();
  const [qtype,setqtype] = useState([]);
  const [api,setapi] = useState([false]);
  const [loading,setloading] = useState(false);
  
  const locdata = JSON.parse(localStorage.getItem('user'));
  const apilocdata = JSON.parse(localStorage.getItem('apiuser'));
  const userdata = JSON.parse(localStorage.getItem('theuser'));
  var apiavail=false;

  // const { state } = this.props.location
  var authenticated=false;
  var papersfetched=false;

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
    const request = await fetch(`http://127.0.0.1:8000/qptypes-list/`)
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
        setqtype(data)
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

  function redirectto(id) {
    alert(`hello, ${id}`);
    papersfetched=true
    localStorage.setItem('paperid',JSON.stringify(id));
  //   return(
  //     <Redirect to="/"/>
  // )
    history.push("/questionbank/quespapers/");
    // history.push({
    //   pathname: '/questionbank/quespapers/',
    //   state: papersfetched // your data array of objects
    // })
  }
  
  return(
    <div className="qbhome">
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
    <h1>QUESTION PAPERS</h1>
    </div>
    <div className="qbouter">
    {apiavail ? (
        <>
      {
      qtype.map(item => (
      <a key={item.id}>
        <div className="qbcard">
        <b>{item.id}</b>
        <b>{item.parentpaperfile}</b>
        <b>{item.description}</b>
        <button onClick={() => redirectto(item.id)}>VIEW</button><br></br><br></br>
        </div>
      </a>
      ))
  
      }
    
        </>
      ) : (
        <><p>{api}</p>
        <p>no api to fetch from :(</p> </>
      )}
      </div>
    </div>
    
  );
}

export default Quesbank;