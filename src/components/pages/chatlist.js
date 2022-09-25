import React,{useState,useEffect, Component } from 'react';
import './chatlist.css';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';
import TNavbar from './tnavbar';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Lchat(){
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
      const [chatcomms,setchatcomms] = useState([]);
      const [comgrade,setcomgrade] = useState([]);
      const [comname,setcomname] = useState([]);
      const [selectedimg, setSelectedimg] = useState();
      const [isimgPicked, setIsimgPicked] = useState(false);
      const imageHandler = (event) => {
        setSelectedimg(event.target.files[0]);
        setIsimgPicked(true);        
      };

      function gotochat(theid)
  {
    localStorage.setItem('chatid',JSON.stringify(theid));
    console.log("chatid is this",theid);
    history.push("/teacher/chat/");
  }

  function deletechat(theid)
  {
    
  }

    function createcommunity()
    {
      const bool=true;
      let form_data= new FormData();
      form_data.append('commname',comname);
      form_data.append('comgrade',comgrade);
      form_data.append('commcreatedby',userdata.email);
      form_data.append('commicon',selectedimg);
      form_data.append('visibility',bool);
        let resurl=`http://127.0.0.1:8000/Tcreatechatcomm/`;
        axios.post(resurl, form_data,
        {
          headers:
          {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          alert('COMMUNITY HAS BEEN CREATED!');
          history.push("/teacher/");
        })
        .catch(err => {
          alert('RE-CHECK THE COMMUNITY DETAILS, FAILED TO ADD COMMUNITY TO THE LIST')
        })
    }

      async function fetchcommslist(stand) {
        var apiavail=false;
        //const chatid= JSON.parse(localStorage.getItem('chatid'));
        console.log("chat id is :",chatid)
        var chatlink=`http://127.0.0.1:8000/Tviewchatcomm/`;
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
            setchatcomms(data)
            console.log("ithuthanda messages",setchatcomms)
          })
          .catch((error) => {
            console.log("the error ",error)
          });
        }

    //setInterval(fetchmessages, 600);
    useEffect(() => {
        fetchcommslist();
    }, []);

      
      
          let center={
              marginLeft:'45%',
          };
return(
    
    <div className="main">
    <TNavbar/>
    <div className="inmain">
    
    <h1>CREATE A CHAT COMMUNITY</h1>
    <div className='chat_create_main'>
      <div className='chat_create_in'>
      <label><b>Enter comunity name:</b>
        <input
          type="text" 
          value={comname}
          onChange={(e) => setcomname(e.target.value)}
        />
        </label>
      </div>
      <div className='chat_create_in'>
      <label><b>Enter grade description:</b>
        <input
          type="text" 
          value={comgrade}
          onChange={(e) => setcomgrade(e.target.value)}
        />
        </label>
      </div>
      <div className='chat_create_in'>
      <label>Add group icon:
        <input type="file" name="image" accept="image/png, image/jpeg" onChange={imageHandler} />
			{isimgPicked ? (
				<div>
          <p><a href={selectedimg}>VIEW IMAGE</a></p>
				</div>
			) : (
				<p>Select a image to show details</p>
			)}
        </label>
      </div>
      <div className='chat_create_in'>
      <button onClick={() => createcommunity()}>CREATE COMMUNITY</button>
      </div>
    </div>
   
        

    {/* <h1>UPDATE COMMUNITY DETAILS</h1> */}
    
    <h1><b>DELETE CHAT</b></h1>
    {chatcomms.length>0 ? 
    <div className="deletec_main">
    {
    chatcomms.map(item => (
    <a key={item.id}>
      <div className='delete_chat'>
        <div className='delete_chat_in'>
           <b>group name:{item.commname}</b>
           </div>
        <div className='delete_chat_in'>
        <p>group for:{item.comgrade}</p>
        </div>
        <div className='delete_chat_in'>
        <p>group was created by:{item.commcreatedby}</p>
        </div>
        <div className='delete_chat_in'>
          <div className='delete_button'>
          <button onClick={() => gotochat(item.id)}>view group</button>
          <button onClick={() => deletechat(item.id)}>delete group</button>
          </div>
        </div>
   
      </div>
       
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

export default Lchat;