import '../../App.css';
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
// import Dispcards from './display';
import './books.css';

function Disp()
{
  const [profile,setprofile] = useState([]);
  const [loading,setloading] = useState(false);
  

  // fetch(`http://127.0.0.1:8000/books-list/`)
  //   .then(response => response.json())
  //   .then(data => {
  //     setprofile(data)
  //     setloading(false)
  //   });
  //   setTimeout(function() {
  //     setloading(true);
  //   }, 1000);

  try
  {
    const request = 
    fetch(`http://127.0.0.1:8000/books-list/`)
    .then(response => response.json())
    .then(data => {
      setprofile(data)
      setloading(false)
    
    });
    // setTimeout(function() {
    //   setloading(true);
    // }, 1000); 
    
  }
  catch(e)
  {
    console.log(e) 
  }

  return(
  <>
  <div className="centertext">
  <h1>BOOKS</h1>
  </div>
  <div className="cardcontainer">
    {

    profile.map(item => (
    <a key={item.id}>
      <div className="card">
          
            <div className="details">
                <h1>{item.name}</h1>
                <p>{item.subject}</p> 
            </div>
        </div>
      
      
    </a>
    ))

    }
  </div>
  </>
  );
}

export default Disp;