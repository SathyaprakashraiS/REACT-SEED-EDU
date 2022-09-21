import '../../App.css';
import React,{useState,useEffect, Component, useCallback } from 'react';

import axios from 'axios';
// import Dispcards from './display';
import './css/quesbankdisp.css';
import GLogin from './log';
import Navbar from '../navbar';
import { Link, Redirect,useHistory } from 'react-router-dom';

function Quesbankdisp()
{
  let history = useHistory();
  const [qpaper,setqpaper] = useState([]);
  const [api,setapi] = useState([false]);
  const [loading,setloading] = useState(false);
  
  const locdata = JSON.parse(localStorage.getItem('user'));
  const apilocdata = JSON.parse(localStorage.getItem('apiuser'));
  const userdata = JSON.parse(localStorage.getItem('theuser'));
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
    var thestring='http://127.0.0.1:8000/qps-list/'+papid+'/'
    console.log("THE STRING MADE IS :",thestring)
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
        setqpaper(data)
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
    localStorage.setItem('paperid',JSON.stringify(papersfetched));
  //   return(
  //     <Redirect to="/"/>
  // )
    history.push("/questionbank");
    // history.push({
    //   pathname: '/questionbank/quespapers/',
    // })
  }

  let tempstore = []



  const passpaper = (file) => {
    console.log("in ")
    tempstore.length = 0
    let frame = document.querySelector(".qpdframe")
    console.log(file)
    frame.src = file
    

  }
  
  return(
    <div className='qpdisp'>
    <Navbar />
 
      {authenticated ? (
        <>
        </>
      ) : (
        <p></p>
      )}
  
  
    {apiavail && papid ? (
      <div className="qpd_outer">
    
  
      <div className='qpdcard'>
      <div className="centertext">
    <h2>QUESTION PAPERS</h2> 
    </div>
        {
      qpaper.map(item => (
      <a key={item.id}>
        <div className="qpd_item">
        <b>{item.name}</b>
        <b>{item.papertype}</b>
        {/* <b>{item.key}</b><br></br> */}
        <b>{item.year}</b>
        <button onClick={(e)=>passpaper(item.paper)}>VIEW</button>
        </div>
      
      
      

      </a>
      ))
  
      }
       </div>
        <div className='qpd_viewer'>
        <iframe src="" width="100%" height="100%" className="qpdframe" ></iframe>
       
        </div>
        </div>
       
       
      ) : (
        <>
        {history.push("/questionbank")}
        </>
      )}
    </div>
    
  );
}

export default Quesbankdisp;