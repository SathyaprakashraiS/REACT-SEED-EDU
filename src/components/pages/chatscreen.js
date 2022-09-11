import React,{useState,useEffect, Component } from 'react';
import './chatscreen.css';
import { GoogleLogout } from 'react-google-login';
import SNavbar from './snavbar';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Achat(){
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
      const chatid= JSON.parse(localStorage.getItem('chatid'));
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
      const [messages,setmessages] = useState([]);

      async function fetchmessages(stand) {
        var apiavail=false;
        //const chatid= JSON.parse(localStorage.getItem('chatid'));
        console.log("chat id is :",chatid)
        var chatlink=`http://127.0.0.1:8000/Aviewchatcomm/`+chatid+'/';
        const request = await fetch(chatlink)
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
            setmessages(data)
            console.log("ithuthanda messages",setmessages)
          })
          .catch((error) => {
            console.log("the error ",error)
          });
        }

    //setInterval(fetchmessages, 600);
    useEffect(() => {
        fetchmessages();
    }, []);

      
      
          let center={
              marginLeft:'45%',
          };
return(
    
    <div className="main">
    <SNavbar/>
    <div className="inmain">
    <h1 style={center}><b>|_o_|</b></h1>
    
    <h1><b>CHAT</b></h1>
    {messages.length>0 ? 
    <div className="cmain">
    {
    messages.map(item => (
    <a key={item.id}>
        {
            item.madebymail==userdata.email?
            <>
            <div className="mychat">
            <b>{item.madeby}</b><br/>
            <p>{item.comment}</p><br/>
            </div>
            </>:
            <>
            <div className="elsechat">
            <b>{item.madeby}</b><br/>
            <p>{item.comment}</p><br/>
            </div>
            </>
        }
        {/* <button onClick={() => attemptquiz(item.cname)}>attempt quiz</button> */}
    </a>
    ))
    }
    </div>
    :
    <p>No quiz available to attend</p>
    }
    
    </div>

    

    </div>
    );
}

export default Achat;