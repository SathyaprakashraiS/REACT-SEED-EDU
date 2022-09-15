import '../../App.css';
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
// import Dispcards from './display';
import './css/tips.css';
import GLogin from './log';
import Navbar from '../navbar';

function Tips()
{
  const [tips,settips] = useState([]);
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
    const request = await fetch(`http://127.0.0.1:8000/tips-list/`)
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
        settips(data)
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

  function viewtip(desc) {
    alert('actually use this function to disp tip using overlay');
    // alert('${desc}');
    alert(`${desc}`);
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
    <div className="centertext">
    <h1>TIPS n TRICKS</h1>
    </div>
    {apiavail ? (
        <><p>{api}</p>
        
      {
      tips.map(item => (
      <a key={item.id}>
        <img src={item.thumbnail}/>
        <b>{item.name}</b>
        <b>{item.grade}</b>
        <b>{item.link}</b>
        <b>{item.isvideo}</b>
        {/* <b>{item.description}</b> */}
        <b>{item.istext}</b>
        <b>{item.tipfile}</b>
        <b>{item.isfile}</b>
        <button onClick={()=>viewtip(item.description)}>view tip</button>
        <br></br>
      </a>
      ))
  
      }
    
        </>
      ) : (
        <p>no api to fetch from :(</p>
      )}
    </>
    
  );
}

export default Tips;