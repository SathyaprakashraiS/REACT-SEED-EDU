import '../../App.css';
import React,{useState,useEffect, Component } from 'react';
import axios from 'axios';
import './books.css';
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


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

  // try
  // {
  //   const request = 
  //   fetch(`http://127.0.0.1:8000/books-list/`)
  //   .then(response => response.json())
  //   .then(data => {
  //     setprofile(data)
  //     setloading(false)
  //   }); 
    
  // }
  // catch(e)
  // {
  //   console.log(e) 
  // }

  

    
    
      async function fetchData() {
        const request = await fetch(`http://127.0.0.1:8000/books-list/`)
          .then(response => response.json())
          .then(data => {
            setprofile(data)
            setloading(false)
          }); 
        }
      
    
    useEffect(() => {
    
      fetchData();
    
    }, []);

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
  );
}

export default Disp;