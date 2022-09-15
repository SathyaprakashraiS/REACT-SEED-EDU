import React,{useState,useEffect, Component } from 'react';
import './shome.css';
import { GoogleLogout } from 'react-google-login';
import SNavbar from './snavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function SNews(){
  let history = useHistory();
  

    const logout = ()=>{
        localStorage.clear(); //for localStorage
        sessionStorage.clear(); //for sessionStorage
        return(
            <Redirect to="/"/>
        )
      }
      const userdata = JSON.parse(localStorage.getItem('theuser'));
      
      var teacher=false
      var student=false
      if(userdata)
      {
          console.log("userdata.is_staff is ",userdata.is_staff)
        if(userdata.is_staff == true)
      {
          teacher=true
          console.log("teacher here")
      }
      if(userdata.is_staff == false){
          student=true
          console.log("student here")
      }
      }
      const [news,setnews] = useState([]);
    const [api,setapi] = useState([false]);
    const [loading,setloading] = useState(false);
      var apiavail=false;
      
      async function fetchBook(stand) {
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
      fetchBook();
    }, []);

    if(news){
        apiavail=true
    }
    else{
        apiavail=false
    }
      console.log(userdata)
          let center={
              marginLeft:'45%',
          };
    
return(
    
    <div className="main">
    <SNavbar/>
    <div className="inmain">
    <h1 style={center}><b>NEWS</b></h1>
    {/* <h1><b>NEWS HERE</b></h1> */}
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
export default SNews;