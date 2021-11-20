import React,{useState,useEffect, Component } from 'react';
import './shome.css';
import { GoogleLogout } from 'react-google-login';

import SNavbar from './snavbar';
import BookStruct from '../structures/BookStruct';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Mockans(){
  let history = useHistory();
  function viewquizans(theid)
  {
    localStorage.setItem('quizid',JSON.stringify(theid));
    history.push("/student/quizans/");
  }
  function viewmockans(theid)
  {
    localStorage.setItem('mockid',JSON.stringify(theid));
    history.push("/student/mockans/");
  }
  function attemptquiz(theid)
  {
    // localStorage.removeItem(quizid);
    localStorage.setItem('quizid',JSON.stringify(theid));
    history.push("/student/attquiz/");
  }

    const logout = ()=>{
        localStorage.clear(); //for localStorage
        sessionStorage.clear(); //for sessionStorage
        // window.location.reload(false);
        return(
            <Redirect to="/"/>
        )
      }
      const userdata = JSON.parse(localStorage.getItem('theuser'));
      const mockid = JSON.parse(localStorage.getItem('mockid'));
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
      const [mans,setmans] = useState([]);
      


      var attquizavail=false;
      async function fetchAns(stand) {
        var apiavail=false;
        var mocklink=`http://127.0.0.1:8000/viewmockans-list/`+mockid+'/';
        console.log("ASDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",mocklink)
        const request = await fetch(mocklink)
          .then(response => {
            if(response.ok)
          {
            console.log("here")
            apiavail=true;
            return response.json(); 
          }
        })
          .then(data => { 
            setmans(data)
            console.log(setmans)
          })
          .catch((error) => {
            console.log("the error ",error)
          });
        }
        
            

              

                
    
    useEffect(() => {
      fetchAns();
    }, []);

      console.log(userdata)
      
          let center={
              marginLeft:'45%',
          };
return(
    
    <div className="main">
    <SNavbar/>
    <div className="inmain">
    <h1 style={center}><b>|_o_|</b></h1>
    <h1><b>MOCK ASNWERSHEET</b></h1>
    <div className="sbook">
    {
    mans.map(item => (
      <a key={item.id}>
        <div >
        <p><b>markobtained: </b>{item.markobtained}</p>
        <p><b>totalmarks: </b>{item.totalmarks}</p>
        </div>
      </a>
      ))
    }
    </div>
    <br/><br/><br/>
    
    
    
    
      

      
  
    </div>
    

   
    </div>
    );
}

export default Mockans;