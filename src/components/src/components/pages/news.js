import '../../App.css';
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
import './css/news.css';
import Navbar from '../navbar';

function News()
{
    const [news,setnews] = useState([]);
    const [api,setapi] = useState([false]);
  const [loading,setloading] = useState(false);
  var apiavail=false;

  async function fetchData() {
    var apiavail=false;
    const request = await fetch(`http://127.0.0.1:8000/news-list/`)
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
        setnews(data)
        setloading(false)
        setapi(true)
        console.log("printing data",data)
      })
      .catch((error) => {
        console.log("the error ",error)
        setapi(false)
      });
    }

useEffect(() => {
  fetchData();
  console.log("this api",news)
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
    <div className="newsmain">
    <Navbar />
    <div className="centertext">
    <h1>NEWS</h1>
    </div>
    <div className="newsouter">
    {apiavail ? (
        <><p>{api}</p>
        <div className="cardcontainer">
      {
  
      news.map(item => (
      <a key={item.id}>
        <div className="ncard">
              <div className="nimgs">
              <a href={item.url}><img src={item.img} alt="not found"/></a>
              <div className="ndetails">
              <a href={item.url}><h1>{item.name}</h1></a>
              <p>{item.liner}</p>
              </div>
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
    </div>
    
  );
}

export default News;