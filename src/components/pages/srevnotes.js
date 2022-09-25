import React,{useState,useEffect, Component } from 'react';
import './srevnotes.css';
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
          // let thecont={
          //   marginLeft:'15%',
          // }

return(
    
    <div className="main">
    <SNavbar/>

    <div className="srev_main">
    <h1 style={center}><b>REVISION NOTES</b></h1>
    <h1><b>CLASS {userdata.standard}</b></h1>
    

  </div>
  <div >
  <div class="scontainer">
    {
    book.map(item => (
        <div class="scard-box">
      <a key={item.id}>
        <div className='scard_outer'>
        <div class="scard-img">
      <img src={item.thumbnail} alt=""/>
          </div>
     <div className='scard-info'>
     <p><b>{item.title}</b></p>
    <p><b>{item.sub}</b></p>
    <a href={item.file}>Read</a></div> 
        </div>
      
    
    
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