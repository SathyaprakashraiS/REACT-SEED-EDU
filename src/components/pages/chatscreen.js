import React,{useState,useEffect, Component } from 'react';
import './chatscreen.css';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';
import SNavbar from './snavbar';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { FaTelegram } from 'react-icons/fa';

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
      const [tosendmessages,settosendmessages] = useState([]);

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

    function sendmessage()
    {
      const bool=true;
      let form_data= new FormData();
      form_data.append('communitytype',chatid);
      form_data.append('comment',tosendmessages);
      form_data.append('madeby',userdata.username);
      form_data.append('madebymail',userdata.email);
      form_data.append('visibility',bool);
        //let resurl=`http://127.0.0.1:8000/Tsendchatcomm/`+chatid+'/';
        let resurl=`http://127.0.0.1:8000/Tsendchatcomm/`;
        axios.post(resurl, form_data,
        {
          headers:
          {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          // alert('message sent!');
          // history.push("/student/");
        })
        .catch(err => {
          alert('RE-CHECK THE message, FAILED TO send message')
        })
    }

    //setInterval(fetchmessages, 600);
    useEffect(() => {
        fetchmessages();
        const interval=setInterval(()=>{
          fetchmessages()
         },100)
    }, []);

      
      
          let center={
              marginLeft:'45%',
          };
return(
    
    <div className="main">
    <SNavbar/>
    <div className="inmain">
    
    <h1><b>CHATs</b></h1>
    {messages.length>0 ? 
    <div className="chat_main">
        <div className='chat_out'>
        {
    messages.map(item => (
    <a key={item.id}>
      
            {item.madebymail==userdata.email?
           
            <div className="mychat">
              <div className='chat_inside'>
                <b>{item.madeby}</b>
                <p>{item.comment}</p><br/>
              </div>
         
            </div>
            :
            
            <div className="elsechat">
              <div className='chat_inside'>
              <b>{item.madeby}</b>
            <p>{item.comment}</p><br/>
              </div>
            
            </div>
            
        }
          
    </a>
    ))
    }
        </div>

    </div>
    :
    <p>No messages yet</p>
    }
    {/* <h1>message section</h1> */}
    <div className='chat_input'>
      <div className='c_inp_div'>
    <input
          type="text" 
          value={tosendmessages}
          onChange={(e) => settosendmessages(e.target.value)}
        /></div>
        <button onClick={() => sendmessage()}><FaTelegram/>send</button>
    </div>
  
    
    </div>

    

    </div>
    );
}

export default Achat;
