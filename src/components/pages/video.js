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

  const passLink = (link)=>{
    let frame = document.querySelector(".framevid")
    frame.src = link

  }

  return(
    <div className="vidmain">
    <Navbar />
  
    {apiavail ? (
     
    <div className='outervidmain'>
         <h1 className="vhead">VIDEOS</h1> 
        <div className="outervid">
       
      {
      video.map(item => (
      <a key={item.id}>
         <div className="innervid">
           
             <div className="v_imge">
             <img src={item.thumbnail}/>
              </div>
             <div className="v_infos">
              <p>{item.name}</p>
              <p>{item.grade}</p>
              <p>{item.description}</p>
              <button className="viewvid" onClick={(e)=>passLink(item.link)}>WATCH NOW</button>
                 
             </div>
             
           
           
        </div>
        
        
      </a>
      ))
      }
      </div>
      <div className="videoplayer">
              {/* <YoutubeEmbed link={item.link}/> */}
              <iframe className='framevid'
      src=""
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
        />
          </div>
     
        </div>
      ) : (
        <p>no api to fetch from :(</p>
      )}
    </div>
    
  );
}

export default Video;