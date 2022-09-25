import React,{useState,useEffect, Component } from 'react';
import Navbar from '../navbar';
import './css/contacts.css';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Contacts(){
  let history = useHistory();
  
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
    
      const [contacts,setcontacts] = useState([]);
      async function fetchcontacts(stand) {
        var apiavail=false;
        var hlplnlink=`http://127.0.0.1:8000/helplinecontacts/`;
        const request = await fetch(hlplnlink)
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
            setcontacts(data)
            console.log(setcontacts)
          })
          .catch((error) => {
            console.log("the error ",error)
          });
        }

    useEffect(() => {
        fetchcontacts();
    }, []);

      console.log(userdata)
      
          let center={
              marginLeft:'45%',
          };
return(
    
    <div className="main">
    <Navbar/>
    <div className="inmain">
    <b>CONTACTS</b>
    {contacts.length>0 ? 
    <div className="contacts">
    {
    contacts.map(item => (
    <a key={item.id}>
      <div className="contactcard">
        <div className='con_img'>
        <img src={item.img} />
        </div>
        <div className='con_det'>
        <b>NAME: {item.contactname}</b><br/>
        <b>CONTACT NUMBER: {item.contactnumber}</b><br/>
        {
            item.mail=="" || item.mail=="-"?<></>:<><b>E-MAIL: {item.mail}</b><br/></>
        }
        <p>{item.brief}</p>
        </div>
        
      </div>
    </a>
    ))
    }
    </div>
    :
    <p>NO contacts available :(</p>
    }
    </div>
    
    </div>
    );
}

export default Contacts;