import '../../App.css';
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
// import Dispcards from './display';
import './css/video.css';
import GLogin from './log';
import Navbar from '../navbar';
import YoutubeEmbed from '../structures/YoutubeEmbed';

function Video()
{
  const [video,setvideo] = useState([]);
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
    const request = await fetch(`http://127.0.0.1:8000/videos-list/`)
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
        setvideo(data)
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

  function viewvideo(desc) {
    alert('actually use this function to disp video using overlay');
    // alert('${desc}');
    alert(`${desc}`);
  }

  return(
    <div className="vidmain">
    <Navbar />
    <h1>VIDEOS</h1>
    {apiavail ? (
        <>
        <p>{api}</p>
        <div className="outervid">
      {
      video.map(item => (
      <a key={item.id}>
         <div className="innervid">
            <div className="cont fron">
             <div className="imge">
             <img src={item.thumbnail}/>
                </div>
             <div className="infos">
              <b>{item.name}</b>
              <b>{item.grade}</b>
              <b>{item.description}</b>
                 
             </div>
             
            </div>
            <div className="cont bac">
              <YoutubeEmbed link={item.link}/>
            </div>
        </div>
        
      </a>
      ))
      }
      </div>
        </>
      ) : (
        <p>no api to fetch from :(</p>
      )}
    </div>
    
  );
}

export default Video;