import React,{useState,useEffect, Component } from 'react';
import './css/arts.css';
import { GoogleLogout } from 'react-google-login';
import SNavbar from './snavbar';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Snotes(){
  let history = useHistory();

    const logout = ()=>{
        localStorage.clear(); //for localStorage
        sessionStorage.clear(); //for sessionStorage
        // window.location.reload(false);
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
      const [book,setbook] = useState([]);
      


      var attquizavail=false;
      async function fetchBook(stand) {
        var apiavail=false;
        var booklink=`http://127.0.0.1:8000/revnotes-list/`+userdata.standard+'/';
        const request = await fetch(booklink)
          .then(response => {
            if(response.ok)
          {
            console.log("here")
            apiavail=true;
            return response.json(); 
          }
          else{
            console.log("im not here")
          }
        })
          .then(data => { 
            setbook(data)
            console.log(setbook)
          })
          .catch((error) => {
            console.log("the error ",error)
          });
        }
        
            

              

                
    
    useEffect(() => {
      fetchBook();
    }, []);

      console.log(userdata)
      
        
          let center={
              marginLeft:'35%',
          };
          let thecont={
            marginLeft:'15%',
          }

return(
    
    <div className="main">
    <SNavbar/>

    <div className="inmain">
    <h1 style={center}><b>REVISION NOTES</b></h1>
    <h1><b>CLASS {userdata.standard}</b></h1>
    

  </div>
  <div style={thecont}>
  <div class="container">
    {
    book.map(item => (
        <div class="card-box">
      <a key={item.id}>
      <div class="card-img">
      <img src={item.thumbnail} alt=""/>
          </div>
      
    <p><b>{item.title}</b></p>
    <p><b>{item.sub}</b></p>
    <a href={"http://127.0.0.1:8000"+item.file}><b>READ NOTES</b></a>
    
      </a>
      </div>
      ))
    }
    </div>
    </div>
    <br/><br/><br/>
   
    
   
    
    
      

      
  
    </div>
    

    
    
    );
}

export default Snotes;