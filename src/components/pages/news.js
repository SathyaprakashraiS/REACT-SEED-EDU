import '../../App.css';
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
import './news.css';

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
    <div className="centertext">
    <h1>NEWS</h1>
    </div>
    {apiavail ? (
        <><p>{api}</p>
        <div className="cardcontainer">
      {
  
      news.map(item => (
      <a key={item.id}>
        <div className="card">
              <div className="imgs">
                  <img src={item.image} alt="not found"/>
              </div>
              <div className="details">
                  <h1>{item.name}</h1>
                  <p>Subject: {item.subject}</p>
                  <p>Details: {item.details}</p>
                  <p>Review: {item.review}</p>
                  <p>Rating: {item.rating}</p>
                  <a href={item.file}><p>View</p></a>
                  <p>bgrade: {item.bgrade}</p> 
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
    </>
    
  );
}

export default News;